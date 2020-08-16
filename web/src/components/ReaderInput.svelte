<script>
  import li, { p, v } from "@the-little-books/little"

  export let node

  $: result = li.match(p("reader-input"), node)

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
