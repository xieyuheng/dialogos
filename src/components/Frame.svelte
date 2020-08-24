<script>
  import * as Dialog from "./frames/Dialog.svelte"
  import * as Card from "./frames/Card.svelte"
  import * as Comment from "./frames/Comment.svelte"
  import * as ChapterStart from "./frames/ChapterStart.svelte"
  import * as ReaderInput from "./frames/ReaderInput.svelte"
  import * as ReaderComment from "./frames/ReaderComment.svelte"
  import * as Loading from "./frames/Loading.svelte"
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
    Loading,
  ]

  const match_frame = (content, frame) => {
    return content[frame.tag] || content[frame.default.name]
  }

  let data

  $: frame = frames.find((frame) => (data = match_frame(content, frame)))

  // -- LIFE CYCLE --

  onMount(() => {
    container.scrollIntoView({ behavior: "smooth" })
  })
</script>

<div bind:this="{container}">
  {#if frame}
    <div class="frame">
      <svelte:component this="{frame.default}" {data} {index} />
    </div>
  {:else}
    <div class="frame">
      <pre>Unknown content: {JSON.stringify(content, null, 4)}</pre>
    </div>
  {/if}
</div>

<style>
  .frame {
    border-top: thin solid;
    border-bottom: thin solid;
  }
</style>
