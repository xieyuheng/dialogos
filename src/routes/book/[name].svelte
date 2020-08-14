<script context="module">
  export async function preload({ params }) {
    const { name } = params
    const res = await this.fetch(`data/${name}`)
    const nodes = await res.json()
    return { name, nodes }
  }
</script>

<script>
  import li from "@the-little-books/little"
  import Frame from "../../components/Frame.svelte"
  import { onMount } from "svelte"
  import { fade, fly } from "svelte/transition"

  export let name
  export let nodes

  let text = ""

  const loader = async (name, module) => {
    const res = await fetch(`data/${name}?module=${module}`)
    const nodes = await res.json()
    return nodes
  }

  const env = li.Env.init(name, nodes, loader)

  let frames = []

  const next = async () => {
    // TODO handle `Env.next` error.
    const node = await li.Env.next(env)
    if (node.kind === "Node.Element" && node.tag === "input-node") {
      // TODO take input node from reader.
      li.Env.push_node(env, node)
    } else {
      frames = [...frames, node]
    }
  }

  let ok

  const onok = () => {
    next()
    button_trun_off(ok, onok)
    setTimeout(() => button_trun_on(ok, onok), 1000/5)
  }

  const button_trun_on = (button, onclick) => {
    button.removeEventListener("click", clicking_too_fast)
    button.addEventListener("click", onclick)
  }

  const button_trun_off = (button, onclick) => {
    button.removeEventListener("click", onclick)
    button.addEventListener("click", clicking_too_fast)
  }

  const clicking_too_fast = () => {
    console.log("You are clicking the button too fast! ⛷")
    console.log("~~~ Hold on for fifth a second. ~~~")
  }

  onMount(() => {
    next()
  })
</script>

<svelte:head>
  <title>Book: {name}</title>
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
    <button class="ok" bind:this="{ok}" on:click="{onok}">⯆</button>
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
  }
</style>
