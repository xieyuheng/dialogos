import * as Env from "../env"
import * as ut from "../ut"
import * as Stmt from "./stmt"
import * as Jump from "./stmt-jump"
import * as Call from "./stmt-call"
import * as Match from "./stmt-match"
import { put_back_entry } from "./put-back-entry"

function match_stmt(content: any, stmt: Stmt.Stmt): any {
  for (const name in content) {
    if (name.toUpperCase() === stmt.name.toUpperCase()) {
      return content[name]
    }
  }
  return undefined
}

const stmts = [Jump, Call, Match]

export async function next(env: Env.Env): Promise<any> {
  const entry = env.return_stack.pop()
  if (entry === undefined) {
    throw new Error("The return_stack is empty.")
  }
  const { contents, index } = entry
  const content = contents[index]
  for (const stmt of stmts) {
    const data = match_stmt(content, stmt)
    if (data !== undefined) {
      return await stmt.execute(env, entry, data, next)
    }
  }
  put_back_entry(env, entry)
  return content
}
