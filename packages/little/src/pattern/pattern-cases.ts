import * as Pattern from "../pattern"
import * as Node from "../node"
import * as ut from "../ut"

export type Cases<A> = Array<
  | [Pattern.Pattern, (result: Pattern.MatchResult) => A]
  | ["default", A]
  | ["default-gen", () => A]
  | ((data: Node.Node) => A)
>

export function cases<A>(node: Node.Node, cases: Cases<A>): A {
  for (const entry of cases) {
    if (typeof entry === "function") {
      try {
        const f = entry
        return f(node)
      } catch (error) {
        if (error instanceof PatternMismatch) {
          continue
        } else {
          throw error
        }
      }
    } else {
      const [pattern, handler] = entry
      if (pattern === "default") {
        return handler as A
      } else if (pattern === "default-gen") {
        return (handler as () => A)()
      } else {
        const result = Pattern.match(pattern, node)
        if (result !== null) {
          return (handler as (result: Pattern.MatchResult) => A)(result)
        }
      }
    }
  }

  throw new PatternMismatch(node, cases)
}

export class PatternMismatch<A> extends Error {
  constructor(public node: Node.Node, public cases: Cases<A>) {
    super(
      ut.aline(`
        |Pattern mismatch,
        |node: ${ut.inspect(node)},
        |cases: ${ut.inspect(cases)},
        |`)
    )
  }
}
