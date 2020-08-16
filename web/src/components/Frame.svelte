<script>
  import Dialog from "./Dialog.svelte"
  import Card from "./Card.svelte"
  import Comment from "./Comment.svelte"
  import ChapterStart from "./ChapterStart.svelte"
  import Echo from "./Echo.svelte"
  import { onMount } from "svelte"

  export let node
  export let index

  let container

  onMount(() => {
    container.scrollIntoView({ behavior: "smooth" })
  })
</script>

<div bind:this="{container}">
  {#if node.tag === 'dialog'}
    <div class="frame">
      <Dialog {node} {index} />
    </div>
  {:else if node.tag === 'card'}
    <div class="frame">
      <Card {node} />
    </div>
  {:else if node.tag === 'comment'}
    <div class="frame">
      <Comment {node} />
    </div>
  {:else if node.tag === 'chapter-start'}
    <div class="frame">
      <ChapterStart {node} />
    </div>
  {:else if node.tag === 'echo'}
    <div class="frame">
      <Echo {node} />
    </div>
  {/if}
</div>

<style>
  .frame {
    position: relative;
    border-top: thin solid;
    border-bottom: thin solid;
  }
</style>
