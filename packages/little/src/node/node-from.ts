import * as Node from "../node"
import { h, text } from "../node"
import * as Err from "../err"
import * as ut from "../ut"

const Window = require("window")
const window = new Window()

export function nodes_from_node(
  node: Node,
  opts: Node.ParseOpts
): Array<Node.Node> {
  if (node.nodeType === window.Node.ELEMENT_NODE) {
    const element = node as Element
    return [from_element(element, opts)]
  } else if (node.nodeType === window.Node.TEXT_NODE) {
    return nodes_from_text(node as Text, opts)
  } else {
    return []
  }
}

export function from_element(
  element: Element,
  opts: Node.ParseOpts
): Node.Element {
  const attributes: { [key: string]: string } = {}
  for (const name of element.getAttributeNames()) {
    attributes[name] = element.getAttribute(name) as string
  }
  return h(
    element.tagName,
    attributes,
    Array.from(element.childNodes).flatMap((node) =>
      nodes_from_node(node, opts)
    )
  )
}

export function nodes_from_text(
  s: Text,
  opts: Node.ParseOpts
): Array<Node.Text> {
  const wholeText = opts.trim ? s.wholeText.trim() : s.wholeText
  if (ut.blank_p(wholeText) && opts.no_blank_text_node) {
    return []
  } else {
    return [text(wholeText)]
  }
}
