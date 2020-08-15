import * as Env from "../env"
import * as Node from "../node"

export async function next(env: Env.Env): Promise<Node.Node> {
  const entry = env.return_stack.pop()
  if (entry === undefined) {
    throw new Error("The return_stack is empty.")
  }
  const { nodes, index } = entry
  const node = nodes[index]
  if (node.kind === "Node.Element" && node.tag === "jump") {
    env.return_stack.push({
      nodes: await env.loader(env.name, node.attributes.module),
      index: 0,
    })
    return await next(env)
  } else if (node.kind === "Node.Element" && node.tag === "call") {
    if (index + 1 < nodes.length) {
      // NOTE proper tail call
      env.return_stack.push({ nodes, index: index + 1 })
    }
    env.return_stack.push({
      nodes: await env.loader(env.name, node.attributes.module),
      index: 0,
    })
    return await next(env)
  } else if (node.kind === "Node.Element" && node.tag === "match") {
    for (const cs of node.contains) {
      // TODO
    }
    throw new Error("TODO")
  } else {
    if (index + 1 < nodes.length) {
      // NOTE proper tail call
      env.return_stack.push({ nodes, index: index + 1 })
    }
    return node
  }
}
