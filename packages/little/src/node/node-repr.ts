import * as Node from "../node"
import * as ut from "../ut"

export function repr(node: Node.Node): string {
  if (node.kind === "Node.Text") {
    return node.value
  } else {
    const attr = repr_attributes(node.attributes)
    const begin = attr ? `<${node.tag} ${attr}>` : `<${node.tag}>`
    const end = `</${node.tag}>`
    if (node.contents.length === 0) {
      return begin + end
    } else if (
      node.contents.length === 1 &&
      node.contents[0].kind === "Node.Text"
    ) {
      return begin + node.contents[0].value + end
    } else {
      return begin + ut.indent(node.contents.map(repr).join("\n")) + end
    }
  }
}

function repr_attributes(attributes: { [key: string]: string }): string {
  return Object.entries(attributes)
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ")
}
