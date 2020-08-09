<script>
  import li from "@the-little-books/little"
  import Card from "./Card.svelte"

  export let title

  const card = li.Node.parse_element(`
<card kind="law">
<title>The Law of Tick Marks</title>
A tick mark directly followed by one or more letters and hyphens is an Atom.
</card>
  `)

</script>

<h2>{title}</h2>
<Card data={card}></Card>

<style>
  @import "./base.css";
</style>
