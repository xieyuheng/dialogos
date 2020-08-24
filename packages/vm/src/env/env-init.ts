import * as Env from "../env"

export function init(the: {
  book: string
  module?: string
  contents: Array<any>
  loader: Env.Loader
}): Env.Env {
  return {
    book: the.book,
    loader: the.loader,
    data_stack: [],
    return_stack: [
      {
        module: the.module || "index",
        contents: the.contents,
        index: 0,
      },
    ],
  }
}
