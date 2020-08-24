import * as Env from "../env"
import * as Jump from "./stmt-jump"
import { put_back_entry } from "./put-back-entry"

export const name = "CALL"

export async function execute(
  env: Env.Env,
  entry: Env.ReturnEntry,
  location: any,
  next: (env: Env.Env) => Promise<any>
): Promise<any> {
  put_back_entry(env, entry)
  return await Jump.execute(env, entry, location, next)
  return await next(env)
}

function find_label_index(contents: Array<any>, label: string): number {
  return contents.findIndex((stmt) => stmt && stmt.label === label)
}
