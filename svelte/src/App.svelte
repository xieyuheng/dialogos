<script>
  import li from "@the-little-books/little"
  import { Router, Link, Route } from "svelte-routing"
  import Frame from "./Frame.svelte"

  export let title
  export let url = ""

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
    `),
  ]
</script>

<Router {url}>
  <nav>
    <Link to="frame/0">0</Link>
    <Link to="frame/1">1</Link>
    <Link to="frame/2">2</Link>
  </nav>
  <div>
    <Route path="frame/:id" let:params>
      <Frame data="{frames[params.id]}" index="{params.id}" />
    </Route>
  </div>
</Router>
