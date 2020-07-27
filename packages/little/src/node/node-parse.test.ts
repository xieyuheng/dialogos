import * as Node from "../node"
import * as ut from "../ut"

{
  const element = Node.parse_element(
    `<div class="frame"><p>abc</p><p>123</p></div>`
  )

  ut.assert_equal(
    element,
    Node.Element("div", { class: "frame" }, [
      Node.Element("p", {}, [Node.Text("abc")]),
      Node.Element("p", {}, [Node.Text("123")]),
    ])
  )
}
