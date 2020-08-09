<script>
  import li from "@the-little-books/little"
  import Card from "./Card.svelte"
  import Comment from "./Comment.svelte"

  export let title

  const card = li.Node.parse_element(`
<card kind="law">
<title>The Law of Tick Marks</title>
A tick mark directly followed by one or more letters and hyphens is an Atom.
</card>
  `)

  const comment = li.Node.parse_element(`
<comment topic="didactics">
<title>The Didactics of forwarding engaging examples</title>

To introduce a new concept, first give many engaging examples.
</comment>
  `)

</script>

<h2>{title}</h2>
<Card data={card}></Card>
<Comment data={comment}></Comment>

<style>
  @import "./base.css";
</style>
