import * as Env from "../env"
import * as ut from "../ut"

function put_back_entry(env: Env.Env, entry: Env.ReturnEntry): Env.Env {
  const { nodes, index } = entry
  // NOTE Handle proper tail call.
  // - put back entry unless at the tail of its nodes.
  if (index + 1 < nodes.length) {
    env.return_stack.push({ ...entry, index: index + 1 })
  }
  return env
}

export async function next(env: Env.Env): Promise<any> {
  const entry = env.return_stack.pop()
  if (entry === undefined) {
    throw new Error("The return_stack is empty.")
  }
  const { nodes, index } = entry
  const node = nodes[index]
  if (node) {
    if (node["jump"]) {
      return await execute_jump(env, entry, node["jump"])
    } else if (node["call"]) {
      return await execute_call(env, entry, node["call"])
    } else if (node["match"]) {
      return await execute_match(env, entry, node["match"])
    } else {
      put_back_entry(env, entry)
      return node
    }
  } else {
    put_back_entry(env, entry)
    return node
  }
}

function find_label_index(nodes: Array<any>, label: string): number {
  return nodes.findIndex(
    (node) => node && node.label === label
  )
}

async function execute_jump(
  env: Env.Env,
  entry: Env.ReturnEntry,
  node: any
): Promise<any> {
  const module = node.module || entry.module
  const nodes = await env.loader(env.book, module)
  const index = node.label
    ? find_label_index(nodes, node.label)
    : 0
  env.return_stack.push({ module, nodes, index })
  return await next(env)
}

async function execute_call(
  env: Env.Env,
  entry: Env.ReturnEntry,
  node: any
): Promise<any> {
  put_back_entry(env, entry)
  return await execute_jump(env, entry, node)
}

async function execute_match(
  env: Env.Env,
  entry: Env.ReturnEntry,
  entries: Array<any>
): Promise<any> {
  const top_node = env.node_stack.pop()
  // NOTE better log.
  // console.log("top_node:", top_node)
  if (top_node === undefined) {
    throw new Error("Empty env.node_stack.")
  }
  for (const entry of entries) {
    if (entry.pattern) {
      // TODO use `match` instead of `ut.equal`,
      // - use matched variables to subst pattern variables in contents.
      if (ut.equal(entry.pattern, top_node)) {
        const contents = entry.contents
        put_back_entry(env, entry)
        env.return_stack.push({ ...entry, nodes: contents, index: 0 })
        return await next(env)
      }
    } else if (entry["default-contents"]) {
      const contents = entry["default-contents"]
      put_back_entry(env, entry)
      env.return_stack.push({ ...entry, nodes: contents, index: 0 })
      return await next(env)
    }
  }
  throw new Error("Mismatch.")
}
