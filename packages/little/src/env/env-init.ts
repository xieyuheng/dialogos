import * as Env from "../env"
import * as Node from "../node"

export function init(the: {
  book: string
  module?: string
  nodes: Array<Node.Node>
  loader: Env.Loader
}): Env.Env {
  return {
    book: the.book,
    loader: the.loader,
    node_stack: [],
    return_stack: [
      {
        module: the.module || "index",
        nodes: the.nodes,
        index: 0,
      },
    ],
  }
}
