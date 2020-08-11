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
  @import "./base.css";

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
