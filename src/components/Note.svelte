<script>
  export let name
  export let content
</script>

<!-- prettier-ignore -->
<pre class="note"> <span class="note-name">{name}</span> {content}</pre>

<style>
  .note {
    font-size: 0.8em;
  }

  .note-name {
    color: blue;
    position: relative;
    top: -0.3em;
  }
</style>
