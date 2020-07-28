import * as Pattern from "../pattern"

export const match = Pattern.match
export const match_one = Pattern.match_one

export function v(name: string): Pattern.Var {
  return {
    kind: "Pattern.Var",
    name,
  }
}

export function p(
  tag: string,
  attributes: { [key: string]: string | RegExp } = {},
  ch: Pattern.Pattern | Array<Pattern.Pattern>,
  opts: {
    tail?: string,
  } = {}
): Pattern.Element {
  return {
    kind: "Pattern.Element",
    tag,
    attributes,
    contents: Array.isArray(ch) ? ch : ch == null ? [] : [ch],
    tail: opts.tail,
  }
}

export function regex(text: string | RegExp): Pattern.Text {
  return {
    kind: "Pattern.Text",
    text,
  }
}
