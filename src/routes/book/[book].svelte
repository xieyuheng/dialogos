<script context="module">
  export async function preload({ host, path, params, query }) {
    const { book } = params
    return { book }
  }
</script>

<script>
  import li from "@the-little-books/little"
  import Frame from "../../components/Frame.svelte"

  export let book

  const index = Number(book)

  const frames = li.Node.parse_nodes(`
<dialog>
<teacher>
Sentences such as
  'ratatouille is an Atom
and
  'cœurs-d-artichauts is an Atom
are called judgments.^[+]
<note name="+">
Thanks, Per Martin-Löf (1942-).
</note>
</teacher>
<student>
What is the point of a judgment?
</student>
</dialog>

<card kind="law">
<title>The Law of Tick Marks</title>
A tick mark directly followed by one or more letters and hyphens is an Atom.
</card>

<comment topic="didactics">
<title>The Didactics of forwarding engaging examples</title>

To introduce a new concept, first give many engaging examples.
</comment>
  `)
</script>

<svelte:head>
  <title>Book: {book}</title>
</svelte:head>

<Frame data="{frames[index]}" {index} />
