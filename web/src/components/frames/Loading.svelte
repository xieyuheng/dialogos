<script context="module">
  export const tag = "Loading"
</script>

<script>
  export let data
</script>

<div class="frame">
  <div class="loading">
    <img src="cute-loader-pink-64px.png" alt="cute-loader" />
    <p>{data}</p>
  </div>
</div>

<style>
  .frame {
    border-top: thin solid;
    border-bottom: thin solid;
  }

  .loading {
    margin: 1em;
    padding: 1em;
    text-align: center;
    color: #8d6c9f;
  }
</style>
