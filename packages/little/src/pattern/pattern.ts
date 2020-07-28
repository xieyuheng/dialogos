export type Pattern = Var | Element | Text

export interface Var {
  kind: "Pattern.Var"
  name: string
}

export interface Element {
  kind: "Pattern.Element"
  tag: string
  attributes: { [key: string]: string | RegExp }
  contents: Array<Pattern>
  opts: {
    tail?: string
  }
}

export interface Text {
  kind: "Pattern.Text"
  text: string | RegExp
}
