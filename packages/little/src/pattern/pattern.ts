export type Pattern = Var | ListVar | End | Element | Text

export interface Var {
  kind: "Pattern.Var"
  name: string
}

export interface ListVar {
  kind: "Pattern.ListVar"
  name: string
}

export interface End {
  kind: "Pattern.End"
}

export interface Element {
  kind: "Pattern.Element"
  tag: string
  contents: Array<Pattern>
}

export interface Text {
  kind: "Pattern.Text"
  value: string | RegExp
}
