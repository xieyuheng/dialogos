import * as Pattern from "../pattern"
import * as Node from "../node"
import * as ut from "../ut"

export type MatchResult = { [key: string]: Node.Node | Array<Node.Node> }

export function match(
  pattern: Pattern.Pattern,
  node: Node.Node,
  result: MatchResult = {}
): null | MatchResult {
  if (pattern.kind === "Pattern.Var") {
    const previous_node = result[pattern.name]
    if (previous_node === undefined) {
      return { ...result, [pattern.name]: node }
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
      let new_result: null | MatchResult = { ...result }
      for (let i = 0; i < pattern.contents.length; i++) {
        const sub_pattern = pattern.contents[i]
        const sub_node = node.contents[i]
        new_result = match(sub_pattern, sub_node, new_result)
        if (new_result === null) {
          return null
        }
      }
      if (pattern.opts.tail !== undefined) {
        const previous_node = result[pattern.opts.tail]
        if (previous_node === undefined) {
          new_result[pattern.opts.tail] = node.contents.slice(
            pattern.contents.length
          )
        } else if (ut.equal(previous_node, node)) {
          return result
        } else {
          return null
        }
      } else if (
        pattern.opts.end &&
        pattern.contents.length !== node.contents.length
      ) {
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
