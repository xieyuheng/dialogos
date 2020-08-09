<script>
  import li from "@the-little-books/little"
  import Frame from "./Frame.svelte"

  export let title

  const frames = [
    li.Node.parse_element(`
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
    `),

    li.Node.parse_element(`
<card kind="law">
<title>The Law of Tick Marks</title>
A tick mark directly followed by one or more letters and hyphens is an Atom.
</card>
    `),

    li.Node.parse_element(`
<comment topic="didactics">
<title>The Didactics of forwarding engaging examples</title>

To introduce a new concept, first give many engaging examples.
</comment>
    `)
  ]
</script>

<h2>{title}</h2>

{#each frames as data, index}
  <Frame {data} {index} />
{/each}
