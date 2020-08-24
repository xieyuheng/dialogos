import * as Env from "../env"

export const name = "JUMP"

export async function execute(
  env: Env.Env,
  entry: Env.ReturnEntry,
  location: any,
  next: (env: Env.Env) => Promise<any>
): Promise<any> {
  const module = location.module || entry.module
  const contents = await env.loader(env.book, module)
  const index = location.label ? find_label_index(contents, location.label) : 0
  env.return_stack.push({ module, contents, index })
  return await next(env)
}

function find_label_index(contents: Array<any>, label: string): number {
  return contents.findIndex((stmt) => stmt && stmt.label === label)
}
