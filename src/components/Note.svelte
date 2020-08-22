<script>
  export let data

  $: name = data[0]
  $: content = data[1]
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
