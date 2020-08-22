<script context="module">
  export const tag = "reader_comment"
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
