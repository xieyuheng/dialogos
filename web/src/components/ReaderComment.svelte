<script>
  import li, { p, v } from "@the-little-books/little"

  export let node

  $: result = li.match(p("reader-comment", v("content")), node)

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
