<script context="module">
  export const tag = "Comment"
</script>

<script>
  export let data
</script>

<div class="comment">
  <pre>{data}</pre>
</div>

<style>
  .comment {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed black;
  }
</style>
