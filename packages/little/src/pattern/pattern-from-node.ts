import { p, v, lv, end, regex } from "./pattern-api"
import * as Pattern from "../pattern"
import * as Node from "../node"
import * as ut from "../ut"

export function from_node(node: Node.Node): Pattern.Pattern {
  if (node.kind === "Node.Text") {
    return regex(node.value)
  } else if (node.tag === "v") {
    const text = node.contents[0]
    if (text === undefined || text.kind !== "Node.Text")  {
      throw new Error("<v> must contains one text node.")
    }
    return v(text.value)
  } else if (node.tag === "lv") {
    const text = node.contents[0]
    if (text === undefined || text.kind !== "Node.Text")  {
      throw new Error("<lv> must contains one text node.")
    }
    return lv(text.value)
  } else if (node.tag === "end") {
    return end
  } else {
    return p(node.tag, node.contents.map(from_node))
  }
}
