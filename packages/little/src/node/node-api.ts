import * as Node from "../node"

export function h(
  tag: string,
  attributes: { [key: string]: string } = {},
  ch: Node.Node | Array<Node.Node>
): Node.Element {
  return {
    kind: "Node.Element",
    tag,
    attributes,
    contents: Array.isArray(ch) ? ch : ch == null ? [] : [ch],
  }
}

export function text(value: string): Node.Text {
  return {
    kind: "Node.Text",
    value,
  }
}
