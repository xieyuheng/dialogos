<script context="module">
  export const tag = "ReaderInput"
</script>

<script>
  export let data

  $: echo = JSON.stringify(data, null, 2)
</script>

<div class="frame">
  <div class="reader-input">
    <pre>{echo}</pre>
  </div>
</div>

<style>
  .frame {
    border-top: thin solid;
    border-bottom: thin solid;
  }

  .reader-input {
    margin: 1em;
    padding: 1em;
    border-left: 2px dashed tomato;
  }
</style>
