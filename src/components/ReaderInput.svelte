<script context="module">
  import li, { p, v } from "@the-little-books/little"

  export const matcher = li.matcher(p("reader-input"))
</script>

<script>
  export let node

  $: result = matcher(node)

  $: echo = node.contents.map(li.Node.repr).join("\n")
</script>

<div class="reader-input">
  <pre>{echo}</pre>
</div>

<style>
  .reader-input {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed tomato;
  }
</style>
