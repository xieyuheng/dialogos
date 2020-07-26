import * as Pattern from "../pattern"
import * as Node from "../node"
import * as ut from "../ut"

ut.assert_equal(Pattern.match(new Pattern.Text("a"), new Node.Text("b")), null)

ut.assert_equal(
  Pattern.match(new Pattern.Text("a"), new Node.Text("a")),
  new Pattern.MatchResult()
)

ut.assert_equal(
  Pattern.match(
    new Pattern.Element("frame", {}, [
      new Pattern.Element("question", {}, [new Pattern.Var("x")]),
    ]),
    new Node.Element("frame", {}, [
      new Node.Element("question", {}, [new Node.Text("a")]),
    ])
  ),
  new Pattern.MatchResult({ x: new Node.Text("a") }, {})
)

ut.assert_equal(
  Pattern.match(
    new Pattern.Element("frame", {}, [
      new Pattern.Element("question", {}, [new Pattern.Var("x")]),
    ]),
    new Node.Element("frame", {}, [
      new Node.Element("question", {}, [
        new Node.Text("a"),
        new Node.Text("b"),
      ]),
    ])
  ),
  null
)

ut.assert_equal(
  Pattern.match(
    new Pattern.Element("frame", {}, [
      new Pattern.Element("question", {}, [new Pattern.Var("x")], "t"),
    ]),
    new Node.Element("frame", {}, [
      new Node.Element("question", {}, [
        new Node.Text("a"),
        new Node.Text("b"),
        new Node.Text("c"),
      ]),
    ])
  ),
  new Pattern.MatchResult(
    { x: new Node.Text("a") },
    { t: [new Node.Text("b"), new Node.Text("c")] }
  )
)
