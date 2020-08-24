<script>
  export let data

  $: echo = JSON.stringify(data, null, 2)
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
