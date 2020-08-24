<script context="module">
  export const tag = "ChapterStart"
</script>

<script>
  export let data

  const { title } = data
</script>

<div class="frame">
  <h2 class="chapter-title">{title}</h2>
</div>

<style>
  .frame {
    border-top: thin solid;
    border-bottom: thin solid;
  }

  .chapter-title {
    text-align: center;
    padding-top: 3em;
    padding-bottom: 3em;
  }
</style>
