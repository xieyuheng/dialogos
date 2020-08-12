<script>
  import Dialog from "./Dialog.svelte"
  import Card from "./Card.svelte"
  import Comment from "./Comment.svelte"
  import ChapterStart from "./ChapterStart.svelte"

  export let data
  export let index
</script>

{#if data.tag === 'dialog'}
  <div class="frame">
    <Dialog {data} {index} />
  </div>
{:else if data.tag === 'card'}
  <div class="frame">
    <Card {data} {index} />
  </div>
{:else if data.tag === 'comment'}
  <div class="frame">
    <Comment {data} {index} />
  </div>
{:else if data.tag === 'chapter-start'}
  <div class="frame">
    <ChapterStart {data} {index} />
  </div>
{/if}

<style>
  .frame {
    position: relative;
    border-top: thin solid;
    border-bottom: thin solid;
  }
</style>
