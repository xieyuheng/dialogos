import * as Node from "../node"
import { h, text } from "./node-api"
import * as Err from "../err"
import * as ut from "../ut"
const parse5 = require("parse5")

export function parse_nodes(
  text: string,
  opts: Node.ParseOpts = {
    trim: true,
    no_blank_text_node: true,
  }
): Array<Node.Element> {
  return parse5
    .parseFragment(text)
    .childNodes.flatMap((node: any) => nodes_from_node(node, opts))
}

function nodes_from_node(node: any, opts: Node.ParseOpts): Array<Node.Node> {
  if (node.tagName) {
    return [from_node(node, opts)]
  } else if (node.nodeName === "#text") {
    return nodes_from_text(node, opts)
  } else {
    return []
  }
}

function from_node(node: any, opts: Node.ParseOpts): Node.Element {
  const attributes: { [key: string]: string } = {}

  if (node.attrs) {
    for (const { name, value } of node.attrs) {
      attributes[name] = value
    }
  }

  let contents = node.childNodes
    ? node.childNodes.flatMap((node: any) => nodes_from_node(node, opts))
    : []

  return h(node.tagName, attributes, contents)
}

function nodes_from_text(node: any, opts: Node.ParseOpts): Array<Node.Text> {
  if (ut.blank_p(node.value) && opts.no_blank_text_node) {
    return []
  } else {
    return opts.trim ? [text(node.value.trim())] : [text(node.value)]
  }
}
