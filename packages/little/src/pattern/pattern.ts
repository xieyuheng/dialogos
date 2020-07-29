export type Pattern = Var | Element | Text

export interface Var {
  kind: "Pattern.Var"
  name: string
}

export interface Element {
  kind: "Pattern.Element"
  tag: string
  contents: Array<Pattern>
  opts: {
    tail?: string
  }
}

export interface Text {
  kind: "Pattern.Text"
  value: string | RegExp
}
