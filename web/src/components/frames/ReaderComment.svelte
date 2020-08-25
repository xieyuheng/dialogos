<script context="module">
  export const tag = "ReaderComment"
</script>

<script>
  export let data
</script>

<div class="frame">
  <div class="reader-comment">
    <pre>{data}</pre>
  </div>
</div>

<style>
  .frame {
    border-top: thin solid;
    border-bottom: thin solid;
  }

  .reader-comment {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed deepskyblue;
  }
</style>
