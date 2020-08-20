<script context="module">
  import li, { p, v } from "@dialogos/little"

  export const matcher = li.matcher(p("note", v("content")))
</script>

<script>
  export let node

  $: result = matcher(node)

  $: name = node.attributes.name
  $: content = result.content.value
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
