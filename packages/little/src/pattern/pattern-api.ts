import * as Pattern from "../pattern"

export function v(name: string): Pattern.Var {
  return {
    kind: "Pattern.Var",
    name,
  }
}

export function p(
  tag: string,
  attributes: { [key: string]: string | RegExp } = {},
  ...contents: Array<Pattern.Pattern>
): Pattern.Element {
  return {
    kind: "Pattern.Element",
    tag,
    attributes,
    contents,
  }
}

export function ptail(
  tag: string,
  attributes: { [key: string]: string | RegExp } = {},
  ...contents: Array<Pattern.Pattern>
): (tail: string) => Pattern.Element {
  return (tail) => {
    return {
      kind: "Pattern.Element",
      tag,
      attributes,
      contents,
      tail,
    }
  }
}

export function regex(text: string | RegExp): Pattern.Text {
  return {
    kind: "Pattern.Text",
    text,
  }
}
