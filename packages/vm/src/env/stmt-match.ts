import * as Env from "../env"
import { put_back_entry } from "./put-back-entry"
import * as ut from "../ut"

export const name = "MATCH"

export async function execute(
  env: Env.Env,
  entry: Env.ReturnEntry,
  clauses: Array<any>,
  next: (env: Env.Env) => Promise<any>
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
        env.return_stack.push({ ...entry, contents: contents, index: 0 })
        return await next(env)
      }
    } else if (clause["default_contents"]) {
      const contents = clause["default_contents"]
      put_back_entry(env, entry)
      env.return_stack.push({ ...entry, contents: contents, index: 0 })
      return await next(env)
    }
  }
  // TODO better error report on Mismatch.
  throw new Error("Mismatch.")
}
