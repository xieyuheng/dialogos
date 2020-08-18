<script context="module">
  import li, { p, v } from "@the-little-books/little"

  export const matcher = li.matcher(p("reader-comment", v("content")))
</script>

<script>
  export let node

  $: result = matcher(node)

  $: content = result.content.value
</script>

<div class="reader-comment">
  <pre>{content}</pre>
</div>

<style>
  .reader-comment {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed deepskyblue;
  }
</style>
