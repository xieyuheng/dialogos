import * as Pattern from "../pattern"
import * as Node from "../node"

export const match = Pattern.match
export const cases = Pattern.cases

export function matcher(
  pattern: Pattern.Pattern
): (node: Node.Node) => null | Pattern.MatchResult {
  return (node) => match(pattern, node)
}

export function v(name: string): Pattern.Var {
  return {
    kind: "Pattern.Var",
    name,
  }
}

export const end: Pattern.End = {
  kind: "Pattern.End",
}

export function lv(name: string): Pattern.ListVar {
  return {
    kind: "Pattern.ListVar",
    name,
  }
}

export function p(
  tag: string,
  ch: Pattern.Pattern | Array<Pattern.Pattern>
): Pattern.Element {
  return {
    kind: "Pattern.Element",
    tag,
    contents: Array.isArray(ch) ? ch : ch == null ? [] : [ch],
  }
}

export function regex(value: string | RegExp): Pattern.Text {
  return {
    kind: "Pattern.Text",
    value,
  }
}
