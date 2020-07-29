import * as Pattern from "../pattern"
import * as Node from "../node"
import * as ut from "../ut"

export class MatchResult {
  constructor(
    public vars: { [key: string]: Node.Node } = {},
    public tails: { [key: string]: Array<Node.Node> } = {}
  ) {}
}

export function match_one(
  pattern: Pattern.Pattern,
  node: Node.Node,
  result: MatchResult = new MatchResult()
): null | MatchResult {
  if (pattern.kind === "Pattern.Var") {
    const previous_node = result.vars[pattern.name]
    if (previous_node === undefined) {
      return new MatchResult(
        { ...result.vars, [pattern.name]: node },
        result.tails
      )
    } else if (ut.equal(previous_node, node)) {
      return result
    } else {
      return null
    }
  } else if (
    pattern.kind === "Pattern.Element" &&
    node.kind === "Node.Element"
  ) {
    if (pattern.tag !== node.tag) {
      return null
    } else if (pattern.contents.length > node.contents.length) {
      return null
    } else {
      let new_result: null | MatchResult = new MatchResult(
        result.vars,
        result.tails
      )
      for (let i = 0; i < pattern.contents.length; i++) {
        const sub_pattern = pattern.contents[i]
        const sub_node = node.contents[i]
        new_result = Pattern.match_one(sub_pattern, sub_node, new_result)
        if (new_result === null) {
          return null
        }
      }
      // TODO handle the same tail name
      if (pattern.opts.tail !== undefined) {
        new_result = new MatchResult(new_result.vars, {
          ...new_result.tails,
          [pattern.opts.tail]: node.contents.slice(pattern.contents.length),
        })
      } else if (pattern.contents.length !== node.contents.length) {
        return null
      }
      return new_result
    }
  } else if (pattern.kind === "Pattern.Text" && node.kind === "Node.Text") {
    if (typeof pattern.value === "string") {
      return pattern.value === node.value ? result : null
    } else {
      return pattern.value.test(node.value) ? result : null
    }
  } else {
    return null
  }
}

export function match<A>(
  node: Node.Node,
  cases: Array<
    [Pattern.Pattern, (result: MatchResult) => A] | ["default", () => A]
  >
): A {
  for (const [pattern, handler] of cases) {
    if (pattern === "default") {
      return (handler as () => A)()
    } else {
      const result = Pattern.match_one(pattern, node)
      if (result !== null) {
        return handler(result)
      }
    }
  }
  throw new Error(
    ut.aline(`
      |Pattern mismatch,
      |node: ${ut.inspect(node)},
      |cases: ${ut.inspect(cases)},
      |`)
  )
}
