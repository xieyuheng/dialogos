import * as Env from "../env"
import * as Node from "../node"
import * as Pattern from "../pattern"

function put_back_entry(env: Env.Env, entry: Env.ReturnEntry): Env.Env {
  const { nodes, index } = entry
  // NOTE Handle proper tail call.
  // - put back entry unless at the tail of its nodes.
  if (index + 1 < nodes.length) {
    env.return_stack.push({ nodes, index: index + 1 })
  }
  return env
}

export async function next(env: Env.Env): Promise<Node.Node> {
  const entry = env.return_stack.pop()
  if (entry === undefined) {
    throw new Error("The return_stack is empty.")
  }
  const { nodes, index } = entry
  const node = nodes[index]
  if (node.kind === "Node.Element") {
    if (node.tag === "jump") {
      return await next_jump(env, entry, node)
    } else if (node.tag === "call") {
      return await next_call(env, entry, node)
    } else if (node.tag === "match") {
      return await next_match(env, entry, node)
    } else {
      put_back_entry(env, entry)
      return node
    }
  } else {
    put_back_entry(env, entry)
    return node
  }
}

async function next_jump(
  env: Env.Env,
  entry: Env.ReturnEntry,
  node: Node.Element
): Promise<Node.Node> {
  env.return_stack.push({
    nodes: await env.loader(env.name, node.attributes.module),
    index: 0,
  })
  return await next(env)
}

async function next_call(
  env: Env.Env,
  entry: Env.ReturnEntry,
  node: Node.Element
): Promise<Node.Node> {
  put_back_entry(env, entry)
  return await next_jump(env, entry, node)
}

async function next_match(
  env: Env.Env,
  entry: Env.ReturnEntry,
  node: Node.Element
): Promise<Node.Node> {
  const top_node = env.node_stack.pop()
  // NOTE better log.
  // console.log("top_node:", top_node)
  if (top_node === undefined) {
    throw new Error("Empty env.node_stack.")
  }
  for (const case_node of node.contents) {
    if (case_node.kind === "Node.Element") {
      if (case_node.tag === "case") {
        const pattern = Pattern.from_node(case_node.contents[0])
        const body = case_node.contents.slice(1)
        const result = Pattern.match(pattern, top_node)
        if (result !== null) {
          // TODO use `result` to subst pattern variables in body.
          put_back_entry(env, entry)
          env.return_stack.push({
            nodes: body,
            index: 0,
          })
          return await next(env)
        }
        // TODO also handle default <case>
      }
    }
  }
  throw new Error("Mismatch.")
}
