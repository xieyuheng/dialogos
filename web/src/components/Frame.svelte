<script>
  import * as Dialog from "./frames/Dialog.svelte"
  import * as Card from "./frames/Card.svelte"
  import * as Comment from "./frames/Comment.svelte"
  import * as ChapterStart from "./frames/ChapterStart.svelte"
  import * as ReaderInput from "./frames/ReaderInput.svelte"
  import * as ReaderComment from "./frames/ReaderComment.svelte"
  import * as Loading from "./frames/Loading.svelte"
  import * as GetReaderInput from "./frames/GetReaderInput.svelte"
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
    GetReaderInput,
  ]

  const match_frame = (content, frame) =>
    content.hasOwnProperty(frame.tag) ? content[frame.tag] : undefined

  let data

  $: frame = frames.find((frame) => {
    const matched = match_frame(content, frame)
    if (matched !== undefined) {
      data = matched
      return true
    } else {
      return false
    }
  })

  // -- LIFE CYCLE --

  onMount(() => {
    container.scrollIntoView({ behavior: "smooth" })
  })
</script>

<div bind:this="{container}">
  {#if frame}
    <svelte:component this="{frame.default}" class="frame" {data} {index} />
  {:else}
    <div class="error-frame">
      <pre>Unknown content: {JSON.stringify(content, null, 4)}</pre>
    </div>
  {/if}
</div>

<style>
  .error-frame {
    border-top: thin solid red;
    border-bottom: thin solid red;
  }
</style>
