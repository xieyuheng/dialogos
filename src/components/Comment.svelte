<script context="module">
  export const matcher = (data) => data["comment"]
</script>

<script>
  export let data

  $: result = matcher(data)

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
