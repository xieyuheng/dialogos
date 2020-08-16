<script context="module">
  export async function preload({ params }) {
    const { book } = params
    const res = await this.fetch(`data/${book}`)
    const nodes = await res.json()
    return { book, nodes }
  }
</script>

<script>
  import li from "@the-little-books/little"
  import Frame from "../../components/Frame.svelte"
  import * as ut from "../../ut"
  import { onMount } from "svelte"
  import { fade, fly } from "svelte/transition"

  export let book
  export let nodes

  let frames = []
  let text = ""
  let mode = "normal"

  const loader = async (book, module) => {
    const res = await fetch(`data/${book}?module=${module}`)
    const nodes = await res.json()
    return nodes
  }

  const env = li.Env.init(book, "index", nodes, loader)

  const stepers = {
    normal: async () => {
      // TODO handle `Env.next` error.
      const node = await li.Env.next(env)
      if (node.kind === "Node.Element") {
        if (node.tag === "input-node") {
          mode = "input"
        } else {
          frames = [...frames, node]
        }
      } else {
        // NOTE plaintext comment in document.
        console.log(node.value)
        await step()
      }
    },
    input: async () => {
      if (text.replace(/\s/g, "").length !== 0) {
        const nodes = li.Node.parse_nodes(text)
        // NOTE only use the first node.
        const [ node ] = nodes
        // TODO log
        // console.log(node)
        env.node_stack.push(node)
        text = ""
        mode = "normal"
        await step()
      } else {
        // TODO message something in the mini-buffer.
        console.log("The input buffer is empty.")
      }
    },
  }

  const step = async () => {
    const steper = stepers[mode]
    await steper()
  }

  let ok

  const ok_icons = {
    normal: "⮟",
    input: "⮜",
  }

  const onok = ut.click_handler({
    onclick: async () => {
      await step()
    },
  })

  onMount(async () => {
    await step()
  })
</script>

<svelte:head>
  <title>Book: {book}</title>
</svelte:head>

<div class="book">
  <div class="frame-list">
    {#each frames as node, index}
      <div class="frame" transition:fly|local>
        <Frame {node} {index} />
      </div>
    {/each}
  </div>
  <div class="reader-input">
    <textarea class="text" bind:value="{text}"></textarea>
    <button class="ok" bind:this="{ok}" on:click="{onok}">
      {ok_icons[mode]}
    </button>
  </div>
</div>

<style>
  .frame-list {
    position: fixed;
    height: 93%;
    width: 100%;
    overflow-y: auto;
    scroll-snap-type: y proximity;
  }

  .frame {
    scroll-snap-align: end;
  }

  .reader-input {
    position: fixed;
    bottom: 0;
    height: 7%;
    width: 100%;
    border-top: thin solid;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .reader-input .text {
    flex: 95%;
  }

  .reader-input .ok {
    flex: 5%;
    min-width: 40px;
  }
</style>
