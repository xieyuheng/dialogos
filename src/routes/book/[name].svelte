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

  export let name
  export let nodes

  const env = li.Env.init(name, nodes)

  let current_index = 0

  const next = () => {
    current_index++
  }
</script>

<svelte:head>
  <title>Book: {name}</title>
</svelte:head>

<div class="book">
  <div class="frame-list">
    {#each nodes as node, index}
      {#if index <= current_index}
        <div class="frame">
          <Frame {node} {index} />
        </div>
      {/if}
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
