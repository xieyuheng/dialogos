export type Node = Element | Text

export interface Element {
  kind: "Node.Element"
  tag: string
  attributes: { [key: string]: string }
  contents: Array<Node>
}

export interface Text {
  kind: "Node.Text"
  value: string
}
