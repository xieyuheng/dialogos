<script context="module">
  import li, { p, v } from "@dialogos/little"

  export const matcher = (node) =>
    li.match(p("comment", [p("title", v("title")), v("content")]), node) ||
    li.match(p("comment", [v("content")]), node)
</script>

<script>
  export let node

  $: result = matcher(node)

  $: title = result.title && result.title.value
  $: content = result.content.value
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
