import * as Env from "../env"

export interface Stmt {
  name: string
  execute: (
    env: Env.Env,
    entry: Env.ReturnEntry,
    clauses: Array<any>,
    next: (env: Env.Env) => Promise<any>
  ) => Promise<any>
}
