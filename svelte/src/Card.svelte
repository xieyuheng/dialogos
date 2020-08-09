<script>
  import li, { p, v } from "@the-little-books/little"
  export let data

  $: result = li.match(data, [
    [
      p("card", [p("title", v("title")), v("content")]),
      ({ vars: { title, content } }) => ({ title, content })
    ],
  ])
</script>

<div class="card">
  <h3 class="card-title">{result.title.value}</h3>
  <pre>{result.content.value}</pre>
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
