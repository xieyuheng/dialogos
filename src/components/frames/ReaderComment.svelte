<script context="module">
  export const tag = "ReaderComment"
</script>

<script>
  export let data
</script>

<div class="reader-comment">
  <pre>{data}</pre>
</div>

<style>
  .reader-comment {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed deepskyblue;
  }
</style>
