<script>
  import Dialog from "./Dialog.svelte"
  import Card from "./Card.svelte"
  import Comment from "./Comment.svelte"

  export let data
  export let index
</script>

<div class="frame">
  {#if data.tag === 'dialog'}
    <Dialog {data} {index} />
  {:else if data.tag === 'card'}
    <Card {data} {index} />
  {:else if data.tag === 'comment'}
    <Comment {data} {index} />
  {/if}
</div>

<style>
  * {
    font-family: "Sarasa Mono SC", "Noto Mono", "Monaco", monospace;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  pre {
    white-space: pre-wrap;
  }

  .frame {
    position: relative;
    border-top: thin solid;
    border-bottom: thin solid;
  }

  .frame-control {
    background: grey;
    position: absolute;
    right: 0.3em;
    bottom: 0.3em;
  }
</style>
