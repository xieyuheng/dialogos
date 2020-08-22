import * as Env from "../env"
import * as ut from "../ut"

function put_back_entry(env: Env.Env, entry: Env.ReturnEntry): Env.Env {
  const { stmts, index } = entry
  // NOTE Handle proper tail call.
  // - put back entry unless at the tail of its stmts.
  if (index + 1 < stmts.length) {
    env.return_stack.push({ ...entry, index: index + 1 })
  }
  return env
}

export async function next(env: Env.Env): Promise<any> {
  const entry = env.return_stack.pop()
  if (entry === undefined) {
    throw new Error("The return_stack is empty.")
  }
  const { stmts, index } = entry
  const stmt = stmts[index]
  if (stmt["jump"]) {
    return await execute_jump(env, entry, stmt["jump"])
  } else if (stmt["call"]) {
    return await execute_call(env, entry, stmt["call"])
  } else if (stmt["match"]) {
    return await execute_match(env, entry, stmt["match"])
  } else {
    put_back_entry(env, entry)
    return stmt
  }
}

function find_label_index(stmts: Array<any>, label: string): number {
  return stmts.findIndex((stmt) => stmt && stmt.label === label)
}

async function execute_jump(
  env: Env.Env,
  entry: Env.ReturnEntry,
  location: any
): Promise<any> {
  const module = location.module || entry.module
  const stmts = await env.loader(env.book, module)
  const index = location.label ? find_label_index(stmts, location.label) : 0
  env.return_stack.push({ module, stmts, index })
  return await next(env)
}

async function execute_call(
  env: Env.Env,
  entry: Env.ReturnEntry,
  location: any
): Promise<any> {
  put_back_entry(env, entry)
  return await execute_jump(env, entry, location)
}

async function execute_match(
  env: Env.Env,
  entry: Env.ReturnEntry,
  clauses: Array<any>
): Promise<any> {
  const data = env.data_stack.pop()
  if (data === undefined) {
    throw new Error("Empty env.data_stack.")
  }
  for (const clause of clauses) {
    if (clause.pattern) {
      // TODO use `match` instead of `ut.equal`,
      // - use matched variables to subst pattern variables in contents.
      if (ut.equal(clause.pattern, data)) {
        const contents = clause.contents
        put_back_entry(env, entry)
        env.return_stack.push({ ...entry, stmts: contents, index: 0 })
        return await next(env)
      }
    } else if (clause["default-contents"]) {
      const contents = clause["default-contents"]
      put_back_entry(env, entry)
      env.return_stack.push({ ...entry, stmts: contents, index: 0 })
      return await next(env)
    }
  }
  // TODO better error report on Mismatch.
  throw new Error("Mismatch.")
}
