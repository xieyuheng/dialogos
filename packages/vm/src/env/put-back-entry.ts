import * as Env from "../env"

export function put_back_entry(env: Env.Env, entry: Env.ReturnEntry): Env.Env {
  const { contents, index } = entry
  // NOTE Handle proper tail call.
  // - put back entry unless at the tail of its contents.
  if (index + 1 < contents.length) {
    env.return_stack.push({ ...entry, index: index + 1 })
  }
  return env
}
