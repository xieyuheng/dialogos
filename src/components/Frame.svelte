<script>
  import * as Dialog from "./Dialog.svelte"
  import * as Card from "./Card.svelte"
  import * as Comment from "./Comment.svelte"
  import * as ChapterStart from "./ChapterStart.svelte"
  import * as ReaderInput from "./ReaderInput.svelte"
  import * as ReaderComment from "./ReaderComment.svelte"
  import { onMount } from "svelte"
  import li from "@the-little-books/little"

  // -- PROP --

  export let node
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

  const found = frames.find((frame) => frame.matcher && frame.matcher(node))
  const Frame = found && found.default

  // -- LIFE CYCLE --

  onMount(() => {
    container.scrollIntoView({ behavior: "smooth" })
  })
</script>

<div bind:this="{container}">
  {#if found}
    <div class="frame">
      <Frame {node} {index} />
    </div>
  {:else}
    <pre>
      Unknown node: {li.Node.repr(node)}
    </pre>
  {/if}
</div>

<style>
  .frame {
    position: relative;
    border-top: thin solid;
    border-bottom: thin solid;
  }
</style>
