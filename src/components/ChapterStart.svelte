<script>
  import li, { p, v } from "@the-little-books/little"

  export let node

  $: result = li.match(p("chapter-start", p("title", v("title"))), node)

  $: title = result.title.value
</script>

<div class="chapter-start">
  <h2 class="chapter-title">{title}</h2>
</div>

<style>
  .chapter-title {
    text-align: center;
    padding-top: 3em;
    padding-bottom: 3em;
  }
</style>
