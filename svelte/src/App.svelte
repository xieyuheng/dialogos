<script>
  import Card from "./Card.svelte"
  export let title;
</script>

<main>
  <h1>The Little Books</h1>
  <h2>{title}</h2>
  <!-- <Card></Card> -->
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
