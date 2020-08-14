<script>
  import li, { p, v } from "@the-little-books/little"

  export let node

  $: result = li.match(p("note", v("content")), node)

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
