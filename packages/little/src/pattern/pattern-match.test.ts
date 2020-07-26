import * as Pattern from "../pattern"
import * as Node from "../node"
import * as ut from "../ut"

ut.assert_equal(Pattern.match(Pattern.Text("a"), Node.Text("b")), null)

ut.assert_equal(
  Pattern.match(Pattern.Text("a"), Node.Text("a")),
  new Pattern.MatchResult()
)

ut.assert_equal(
  Pattern.match(
    Pattern.Element("frame", {}, [
      Pattern.Element("question", {}, [Pattern.Var("x")]),
    ]),
    Node.Element("frame", {}, [Node.Element("question", {}, [Node.Text("a")])])
  ),
  new Pattern.MatchResult({ x: Node.Text("a") }, {})
)

ut.assert_equal(
  Pattern.match(
    Pattern.Element("frame", {}, [
      Pattern.Element("question", {}, [Pattern.Var("x")]),
    ]),
    Node.Element("frame", {}, [
      Node.Element("question", {}, [Node.Text("a"), Node.Text("b")]),
    ])
  ),
  null
)

ut.assert_equal(
  Pattern.match(
    Pattern.Element("frame", {}, [
      Pattern.Element("question", {}, [Pattern.Var("x")], "t"),
    ]),
    Node.Element("frame", {}, [
      Node.Element("question", {}, [
        Node.Text("a"),
        Node.Text("b"),
        Node.Text("c"),
      ]),
    ])
  ),
  new Pattern.MatchResult(
    { x: Node.Text("a") },
    {
      t: [Node.Text("b"), Node.Text("c")],
    }
  )
)
