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

{#each frames as data, index}
  <Frame {data} {index} />
{/each}
