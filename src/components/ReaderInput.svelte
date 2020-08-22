<script context="module">
  export const matcher = (node) => node["reader-input"]
</script>

<script>
  export let node

  $: result = matcher(node)

  $: echo = JSON.stringify(result, null, 2)
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
