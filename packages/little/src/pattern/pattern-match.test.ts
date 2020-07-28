import * as Pattern from "../pattern"
import { p, v, regex } from "../pattern"
import * as Node from "../node"
import { h, text } from "../node"
import * as ut from "../ut"

ut.assert_equal(Pattern.match(regex("a"), text("b")), null)

ut.assert_equal(Pattern.match(regex("a"), text("a")), new Pattern.MatchResult())

ut.assert_equal(
  Pattern.match(
    p("frame", {}, p("question", {}, v("x"))),
    h("frame", {}, h("question", {}, text("a")))
  ),
  new Pattern.MatchResult({ x: text("a") }, {})
)

ut.assert_equal(
  Pattern.match(
    p("frame", {}, p("question", {}, v("x"))),
    h("frame", {}, h("question", {}, [text("a"), text("b")]))
  ),
  null
)

ut.assert_equal(
  Pattern.match(
    p("frame", {}, p("question", {}, v("x"), { tail: "t" })),
    h("frame", {}, h("question", {}, [text("a"), text("b"), text("c")]))
  ),
  new Pattern.MatchResult({ x: text("a") }, { t: [text("b"), text("c")] })
)