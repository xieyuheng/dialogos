<script>
  import li, { p, v } from "@the-little-books/little"

  export let data

  $: result =
    li.match(p("chapter-start", p("title", v("title"))), data)

  $: title = result?.vars.title.value
</script>

{#if result}
  <div class="chapter-start">
    <h2 class="chapter-title">{title}</h2>
  </div>
{/if}

<style>
  .chapter-title {
    text-align: center;
    padding-top: 3em;
    padding-bottom: 3em;
  }
</style>
