import * as Node from "../node"

export type Pattern = Var | Element | Text

export interface Var {
  kind: "Pattern.Var"
  name: string
}

export function Var(name: string): Var {
  return {
    kind: "Pattern.Var",
    name
  }
}

export interface Element {
  kind: "Pattern.Element"
  tag: string
  attributes: { [key: string]: string | RegExp }
  contents: Array<Pattern>
  tail?: string
}

export interface Text {
  kind: "Pattern.Text"
  text: string | RegExp
}
