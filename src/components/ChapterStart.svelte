<script context="module">
  export const matcher = (data) => data["chapter_start"]
</script>

<script>
  export let data

  $: result = matcher(data)

  $: title = result.title
</script>

<div class="chapter_start">
  <h2 class="chapter-title">{title}</h2>
</div>

<style>
  .chapter-title {
    text-align: center;
    padding-top: 3em;
    padding-bottom: 3em;
  }
</style>
