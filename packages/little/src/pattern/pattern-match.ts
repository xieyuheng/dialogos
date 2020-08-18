import * as Pattern from "../pattern"
import * as Node from "../node"
import * as ut from "../ut"

export type MatchResult = { [key: string]: Node.Node | Array<Node.Node> }

export function match(
  pattern: Pattern.Pattern,
  node: Node.Node,
  result: MatchResult = {}
): null | MatchResult {
  const matched = match_nodes(pattern, [node], result)
  if (matched === null) {
    return null
  } else {
    const [_remain_nodes, result] = matched
    return result
  }
}

function match_tag(pattern_tag: Pattern.Tag, tag: string): boolean {
  if (typeof pattern_tag === "string") {
    return pattern_tag === tag
  } else if (pattern_tag instanceof RegExp) {
    return pattern_tag.test(tag)
  } else if (pattern_tag instanceof Array) {
    return pattern_tag.some((p_tag: Pattern.Tag) => match_tag(p_tag, tag))
  } else {
    throw new Error(`unknown pattern_tag: ${pattern_tag} for tag: ${tag}.`)
  }
}

// NOTE No side effect on the argument `result`.
// - `result` is used as env for name lookup.
export function match_nodes(
  pattern: Pattern.Pattern,
  nodes: Array<Node.Node>,
  result: MatchResult = {}
): null | [Array<Node.Node>, MatchResult] {
  if (pattern.kind === "Pattern.Var") {
    if (nodes.length === 0) {
      return null
    }
    const [node] = nodes
    const previous = result[pattern.name]
    if (previous === undefined) {
      return [nodes.slice(1), { ...result, [pattern.name]: node }]
    } else if (ut.equal(previous, node)) {
      return [nodes.slice(1), result]
    } else {
      return null
    }
  } else if (pattern.kind === "Pattern.End") {
    if (nodes.length === 0) {
      return [[], result]
    } else {
      return null
    }
  } else if (pattern.kind === "Pattern.ListVar") {
    const previous = result[pattern.name]
    if (previous === undefined) {
      return [[], { ...result, [pattern.name]: nodes }]
    } else if (ut.equal(previous, nodes)) {
      return [[], result]
    } else {
      return null
    }
  } else if (pattern.kind === "Pattern.Element") {
    if (nodes.length === 0) {
      return null
    }
    const [node] = nodes
    if (node.kind === "Node.Element") {
      if (!match_tag(pattern.tag, node.tag)) {
        return null
      } else {
        let new_result: null | MatchResult = { ...result }
        let remain_nodes = node.contents
        for (let i = 0; i < pattern.contents.length; i++) {
          const sub_pattern = pattern.contents[i]
          const matched = match_nodes(sub_pattern, remain_nodes, new_result)
          if (matched === null) {
            return null
          }
          const [next_remain_nodes, next_new_result] = matched
          new_result = next_new_result
          remain_nodes = next_remain_nodes
        }
        return [nodes.slice(1), new_result]
      }
    } else {
      return null
    }
  } else if (pattern.kind === "Pattern.Text") {
    if (nodes.length === 0) {
      return null
    }
    const [node] = nodes
    if (node.kind === "Node.Text") {
      if (typeof pattern.value === "string") {
        return pattern.value === node.value ? [nodes.slice(1), result] : null
      } else {
        return pattern.value.test(node.value) ? [nodes.slice(1), result] : null
      }
    } else {
      return null
    }
  } else {
    return null
  }
}
