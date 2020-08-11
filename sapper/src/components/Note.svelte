<script>
  import li, { p, v } from "@the-little-books/little"

  export let data

  $: result = li.match(p("note", v("content")), data)

  $: name = result && data.attributes.name
  $: content = result && result.vars.content.value
</script>

{#if result}
  <pre class="note">
    <span class="note-name">{name}</span>
    {content}
  </pre>
{/if}

<style>
  @import "./base.css";

  .note {
    font-size: 0.8em;
  }

  .note-name {
    color: blue;
    position: relative;
    top: -0.3em;
  }
</style>
