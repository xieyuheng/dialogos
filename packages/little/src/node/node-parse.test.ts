import * as Node from "../node"
import { h, text } from "./node-api"
import * as ut from "../ut"

{
  const element = Node.parse_element(
    `<div class="frame"><p>abc</p><p>123</p></div>`
  )

  ut.assert_equal(
    element,
    h( "div", { class: "frame" }, [
      h("p", {}, text("abc")),
      h("p", {}, text("123"))
    ])
  )
}
