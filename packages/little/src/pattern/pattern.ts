import * as Node from "../node"

export type Pattern = Var | Element | Text

export interface Var {
  kind: "Pattern.Var"
  name: string
}

export function Var(name: string): Var {
  return {
    kind: "Pattern.Var",
    name,
  }
}

export interface Element {
  kind: "Pattern.Element"
  tag: string
  attributes: { [key: string]: string | RegExp }
  contents: Array<Pattern>
  tail?: string
}

export function Element(
  tag: string,
  attributes: { [key: string]: string | RegExp } = {},
  contents: Array<Pattern> = [],
  tail?: string
): Element {
  return {
    kind: "Pattern.Element",
    tag,
    attributes,
    contents,
    tail,
  }
}

export interface Text {
  kind: "Pattern.Text"
  text: string | RegExp
}

export function Text(text: string | RegExp): Text {
  return {
    kind: "Pattern.Text",
    text,
  }
}
