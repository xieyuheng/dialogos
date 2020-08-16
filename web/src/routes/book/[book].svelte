<script context="module">
  export async function preload({ params }) {
    const { book } = params
    const res = await this.fetch(`data/${book}`)
    const nodes = await res.json()
    return { book, nodes }
  }
</script>

<script>
  import li, { h } from "@the-little-books/little"
  import Frame from "../../components/Frame.svelte"
  import * as ut from "../../ut"
  import { onMount } from "svelte"
  import { fade, fly } from "svelte/transition"

  // -- PROP --

  export let book
  export let nodes

  // -- LOCAL STATE --

  let frames = []
  let text = ""
  let mode = "normal"
  let mini_buffer = ""

  // -- DOM ELEMENT --

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

  // -- LIFE CYCLE --

  onMount(async () => {
    await step()
  })

  // -- BUSINESS --

  const env = li.Env.init({
    book,
    nodes,
    module: "index",
    loader: async (book, module) => {
      const res = await fetch(`data/${book}?module=${module}`)
      const nodes = await res.json()
      return nodes
    },
  })

  const step = async () => {
    switch (mode) {
      case "normal":
        return await step_normal()
      case "input":
        return await step_input()
    }
  }

  const step_normal = async () => {
    // TODO handle `Env.next` error.
    const node = await li.Env.next(env)
    if (node.kind === "Node.Element") {
      if (node.tag === "input-node") {
        mode = "input"
        mini_buffer = "Entering input-mode."
      } else {
        frames = [...frames, node]
        mini_buffer = ""
      }
    } else {
      // NOTE plaintext comment in document.
      console.log(node.value)
      await step()
    }
  }

  const step_input = async () => {
    if (text.replace(/\s/g, "").length !== 0) {
      const nodes = li.Node.parse_nodes(text)
      // NOTE only use the first node.
      const [node] = nodes
      env.node_stack.push(node)
      frames = [...frames, h("echo", {}, node)]
      text = ""
      mode = "normal"
      mini_buffer = "Back to normal-mode from input-mode."
      await step()
    } else {
      mini_buffer = "The input buffer is empty. You should enter your answer."
    }
  }
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
  <pre class="mini-buffer">{mini_buffer}</pre>
</div>

<style>
  .frame-list {
    position: fixed;
    height: 90%;
    width: 100%;
    overflow-y: auto;
    scroll-snap-type: y proximity;
  }

  .frame {
    scroll-snap-align: end;
  }

  .reader-input {
    position: fixed;
    bottom: 3%;
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

  .mini-buffer {
    position: fixed;
    bottom: 0;
    height: 3%;
    font-size: 0.7em;
    padding-left: 3px;
    padding-right: 3px;
    width: 100%;
    border-top: thin solid;
    border-color: black;
    background: #eee;
    color: #666;
  }
</style>
