<script>
  import li, { p, v } from "@the-little-books/little"

  export let data

  $: result = li.match(p("card", [p("title", v("title")), v("content")]), data)
</script>

{#if result}
  <div class="card">
    <h3 class="card-title">{result.vars.title.value}</h3>
    <pre>{result.vars.content.value}</pre>
  </div>
{/if}

<style>
  /* @import "./base.css"; */

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
