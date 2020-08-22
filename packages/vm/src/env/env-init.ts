import * as Env from "../env"

export function init(the: {
  book: string
  module?: string
  stmts: Array<any>
  loader: Env.Loader
}): Env.Env {
  return {
    book: the.book,
    loader: the.loader,
    data_stack: [],
    return_stack: [
      {
        module: the.module || "index",
        stmts: the.stmts,
        index: 0,
      },
    ],
  }
}
