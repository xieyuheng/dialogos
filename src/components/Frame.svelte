<script>
  import * as Dialog from "./Dialog.svelte"
  import * as Card from "./Card.svelte"
  import * as Comment from "./Comment.svelte"
  import * as ChapterStart from "./ChapterStart.svelte"
  import * as ReaderInput from "./ReaderInput.svelte"
  import * as ReaderComment from "./ReaderComment.svelte"
  import { onMount } from "svelte"

  // -- PROP --

  export let data
  export let index

  // -- DOM ELEMENT --

  let container

  // -- BUSINESS --

  const frames = [
    Dialog,
    Card,
    Comment,
    ChapterStart,
    ReaderInput,
    ReaderComment,
  ]

  const found = frames.find((frame) => data.hasOwnProperty(frame.tag))
  const Frame = found && found.default

  // -- LIFE CYCLE --

  onMount(() => {
    container.scrollIntoView({ behavior: "smooth" })
  })
</script>

<div bind:this="{container}">
  {#if found}
    <div class="frame">
      <Frame data="{data[found.tag]}" {index} />
    </div>
  {:else}
    <pre>Unknown data: {JSON.stringify(data, null, 4)}</pre>
  {/if}
</div>

<style>
  .frame {
    position: relative;
    border-top: thin solid;
    border-bottom: thin solid;
  }
</style>
