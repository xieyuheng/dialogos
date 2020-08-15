import * as Pattern from "../pattern"
import { p, v, lv, end, regex } from "./pattern-api"
import * as Node from "../node"
import { h, text } from "../node/node-api"
import * as ut from "../ut"

ut.assert_equal(Pattern.match(regex("a"), text("b")), null)

ut.assert_equal(Pattern.match(regex("a"), text("a")), {})

ut.assert_equal(
  Pattern.match(
    p("frame", p("teacher", v("x"))),
    h("frame", {}, h("teacher", {}, text("a")))
  ),
  { x: text("a") }
)

ut.assert_equal(
  Pattern.match(
    p("frame", p("teacher", [v("x"), end])),
    h("frame", {}, h("teacher", {}, [text("a"), text("b")]))
  ),
  null
)

ut.assert_equal(
  Pattern.match(
    p("frame", p("teacher", v("x"))),
    h("frame", {}, h("teacher", {}, [text("a"), text("b")]))
  ),
  { x: text("a") }
)

ut.assert_equal(
  Pattern.match(
    p("frame", p("teacher", [v("x"), lv("t")])),
    h("frame", {}, h("teacher", {}, [text("a"), text("b"), text("c")]))
  ),
  { x: text("a"), t: [text("b"), text("c")] }
)
