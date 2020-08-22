<script context="module">
  export const matcher = (data) => data["reader-comment"]
</script>

<script>
  export let data

  $: result = matcher(data)

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
