<script context="module">
  export async function preload({ params }) {
    const { name } = params

    const res = await this.fetch(`data/${name}`)
    const frames = await res.json()

    return { name, frames }
  }
</script>

<script>
  import li from "@the-little-books/little"
  import Frame from "../../components/Frame.svelte"

  export let name
  export let frames
</script>

<svelte:head>
  <title>Book: {name}</title>
</svelte:head>

<div class="book">
  <div class="frame-list">
    {#each frames as data, index}
      <Frame {data} {index} />
    {/each}
  </div>
  <div class="user-input">
    <textarea class="text"></textarea>
    <button class="next">NEXT</button>
  </div>
</div>

<style>
  .frame-list {
    position: fixed;
    height: 93vh;
    width: 100%;
    overflow-y: auto;
  }

  .user-input {
    position: fixed;
    bottom: 0;
    height: 7vh;
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
