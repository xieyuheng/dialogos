import * as Env from "../env"
import * as ut from "../ut"
import * as Stmt from "./stmt"
import { put_back_entry } from "./put-back-entry"

export function match_stmt_name(content: any, stmt_name: string): any {
  for (const name in content) {
    if (name.toUpperCase() === stmt_name.toUpperCase()) {
      return content[name]
    }
  }
  return undefined
}

function match_stmt(content: any, stmt: Stmt.Stmt): any {
  return match_stmt_name(content, stmt.name)
}

const stmts = [
  require("./stmt-jump"),
  require("./stmt-call"),
  require("./stmt-match"),
]

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
