<script context="module">
  export const tag = "Comment"
</script>

<script>
  export let data
</script>

<div class="frame">
  <div class="comment">
    <pre>{data}</pre>
  </div>
</div>

<style>
  .frame {
    border-top: thin solid;
    border-bottom: thin solid;
  }

  .comment {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed black;
  }
</style>
