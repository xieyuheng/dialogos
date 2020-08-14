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

  export let name
  export let nodes

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
    frames = [...frames, node]
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
      <div class="frame">
        <Frame {node} {index} />
      </div>
    {/each}
  </div>
  <div class="user-input">
    <textarea class="text"></textarea>
    <button class="next" on:click="{next}">NEXT</button>
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

  .user-input {
    position: fixed;
    bottom: 0;
    height: 7%;
    width: 100%;
    border-top: thin solid;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .user-input .text {
    flex: 90%;
  }

  .user-input .next {
  }
</style>
