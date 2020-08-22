<script>
  import * as Dialog from "./frames/Dialog.svelte"
  import * as Card from "./frames/Card.svelte"
  import * as Comment from "./frames/Comment.svelte"
  import * as ChapterStart from "./frames/ChapterStart.svelte"
  import * as ReaderInput from "./frames/ReaderInput.svelte"
  import * as ReaderComment from "./frames/ReaderComment.svelte"
  import { onMount } from "svelte"

  // -- PROP --

  export let content
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

  const frame = frames.find((frame) => content.hasOwnProperty(frame.tag))
  const FrameComponent = frame && frame.default
  const data = frame && content[frame.tag]

  // -- LIFE CYCLE --

  onMount(() => {
    container.scrollIntoView({ behavior: "smooth" })
  })
</script>

<div bind:this="{container}">
  {#if frame}
    <div class="frame">
      <FrameComponent {data} {index} />
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
