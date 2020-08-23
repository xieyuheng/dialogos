<script context="module">
  export const tag = "loading"
</script>

<script>
  export let data
</script>

<div class="loading">
  <pre>{data}</pre>
</div>

<style>
  .loading {
    margin: 1em;
    padding: 1em;
    text-align: center;
    color: #f9dbd2;
  }
</style>
