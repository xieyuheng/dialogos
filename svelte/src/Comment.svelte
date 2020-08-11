<script>
  import li, { p, v } from "@the-little-books/little"

  export let data

  $: result =
    li.match(p("comment", [p("title", v("title")), v("content")]), data) ||
    li.match(p("comment", [v("content")]), data)

  $: title = result && result.vars.title.value
  $: content = result && result.vars.content.value
</script>

{#if result}
  <div class="comment">
    {#if title}
      <h3 class="comment-title">{title}</h3>
      <br />
    {/if}
    <pre>{content}</pre>
  </div>
{/if}

<style>
  @import "./base.css";

  .comment {
    margin: 1em;
    padding: 1em;
    border-left: thin dashed;
  }
</style>
