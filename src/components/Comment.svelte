<script context="module">
  export const matcher = (node) => node["comment"]
</script>

<script>
  export let node

  $: result = matcher(node)

  $: title = undefined
  $: content = result
</script>

<div class="comment">
  {#if title}
    <h3 class="comment-title">{title}</h3>
    <br />
  {/if}
  <pre>{content}</pre>
</div>

<style>
  .comment {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed black;
  }
</style>
