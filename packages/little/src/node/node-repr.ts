import * as Node from "../node"
import * as ut from "../ut"

export function repr(node: Node.Node): string {
  if (node.kind === "Node.Text") {
    return node.value
  } else {
    let s = ""
    s += `<${node.tag}>`
    s += ut.indent(node.contents.map(repr).join("\n"))
    s += `</${node.tag}>`
    return s
  }
}
