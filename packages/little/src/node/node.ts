export type Node = Element | Text

export interface Element {
  kind: "Node.Element"
  tag: string
  attributes: { [key: string]: string }
  contents: Array<Node>
}

export function Element(
  tag: string,
  attributes: { [key: string]: string } = {},
  contents: Array<Node> = []
): Element {
  return {
    kind: "Node.Element",
    tag,
    attributes,
    contents,
  }
}

export interface Text {
  kind: "Node.Text"
  text: string
}

export function Text(text: string): Text {
  return {
    kind: "Node.Text",
    text,
  }
}
