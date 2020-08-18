<script context="module">
  import li, { p, v } from "@the-little-books/little"

  export const matcher = li.matcher(
    p("card", [p("title", v("title")), v("content")])
  )
</script>

<script>
  export let node

  $: result = matcher(node)

  $: title = result.title.value
  $: content = result.content.value
</script>

<div class="card">
  <h3 class="card-title">{title}</h3>
  <pre>{content}</pre>
</div>

<style>
  .card {
    text-align: center;
    padding: 1em;
    margin-left: 4em;
    margin-right: 4em;
    margin-top: 2em;
    margin-bottom: 2em;
    border: thick double;
  }
</style>
