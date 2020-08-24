<script context="module">
  export const tag = "Card"
</script>

<script>
  export let data

  const { title, content } = data
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
