<script context="module">
  export const matcher = (node) => node["reader-comment"]
</script>

<script>
  export let node

  $: result = matcher(node)

  $: content = result
</script>

<div class="reader-comment">
  <pre>{content}</pre>
</div>

<style>
  .reader-comment {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed deepskyblue;
  }
</style>
