<script context="module">
  export const matcher = (data) => data["card"]
</script>

<script>
  export let data

  $: result = matcher(data)

  $: title = result.title
  $: content = result.content
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
