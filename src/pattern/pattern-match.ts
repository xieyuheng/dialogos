import * as Node from "../node"
import * as Pattern from "../pattern"
import * as ut from "../ut"

export class MatchResult {
  constructor(
    public vars: { [key: string]: Node.Node } = {},
    public tails: { [key: string]: Array<Node.Node> } = {}
  ) {}
}

export function match(
  pattern: Pattern.Pattern,
  node: Node.Node,
  result: MatchResult = new MatchResult()
): null | MatchResult {
  if (pattern instanceof Pattern.Var) {
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
    pattern instanceof Pattern.Element &&
    node instanceof Node.Element
  ) {
    if (pattern.tag !== node.tag) {
      return null
    } else if (pattern.contents.length > node.contents.length) {
      return null
    } else {
      // TODO filter by pattern attributes
      let new_result: null | MatchResult = new MatchResult(
        result.vars,
        result.tails
      )
      for (let i = 0; i < pattern.contents.length; i++) {
        const sub_pattern = pattern.contents[i]
        const sub_node = node.contents[i]
        new_result = Pattern.match(sub_pattern, sub_node, new_result)
        if (new_result === null) {
          return null
        }
      }
      // TODO handle the same tail name
      if (pattern.tail !== undefined) {
        new_result = new MatchResult(new_result.vars, {
          ...new_result.tails,
          [pattern.tail]: node.contents.slice(pattern.contents.length),
        })
      }
      return new_result
    }
  } else if (pattern instanceof Pattern.Text && node instanceof Node.Text) {
    if (typeof pattern.text === "string") {
      return pattern.text === node.text ? result : null
    } else {
      return pattern.text.test(node.text) ? result : null
    }
  } else {
    return null
  }
}
