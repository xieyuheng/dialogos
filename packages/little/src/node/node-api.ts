import * as Node from "../node"

export function h(
  tag: string,
  attributes: { [key: string]: string } = {},
  ...contents: Array<Node.Node>
): Node.Element {
  return {
    kind: "Node.Element",
    tag,
    attributes,
    contents,
  }
}

export function text(text: string): Node.Text {
  return {
    kind: "Node.Text",
    text,
  }
}
