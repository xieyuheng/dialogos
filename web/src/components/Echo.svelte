<script>
  import li, { p, v } from "@the-little-books/little"

  export let node

  $: result = li.match(p("echo"), node)

  $: echo = node.contents.map(li.Node.repr).join("\n")
</script>

<div class="echo">
  <pre>{echo}</pre>
</div>

<style>
  .echo {
    margin: 1em;
    padding: 1em;
    border-left: thin dashed;
    border-color: tomato;
  }
</style>
