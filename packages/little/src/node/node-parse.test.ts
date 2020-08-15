import * as Node from "../node"
import { h, text } from "./node-api"
import * as ut from "../ut"

{
  const nodes = Node.parse_nodes(
    `<div class="frame"><p>abc</p><p>123</p></div>`
  )

  ut.assert_equal(nodes, [
    h("div", { class: "frame" }, [
      h("p", {}, text("abc")),
      h("p", {}, text("123")),
    ]),
  ])
}

{
  const nodes = Node.parse_nodes(
    `<div class="frame">
      <p>
        abc
      </p>
      <p>
        123
      </p>
    </div>`
  )

  ut.assert_equal(nodes, [
    h("div", { class: "frame" }, [
      h("p", {}, text("abc")),
      h("p", {}, text("123")),
    ]),
  ])
}

{
  const nodes = Node.parse_nodes(
    `<div class="frame"><p>abc</p><p>123</p></div>
     <div class="frame"><p>abc</p><p>123</p></div>`
  )

  ut.assert_equal(nodes, [
    h("div", { class: "frame" }, [
      h("p", {}, text("abc")),
      h("p", {}, text("123")),
    ]),
    h("div", { class: "frame" }, [
      h("p", {}, text("abc")),
      h("p", {}, text("123")),
    ]),
  ])
}
