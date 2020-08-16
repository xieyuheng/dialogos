import * as Env from "../env"
import * as Node from "../node"

export function init(
  book: string,
  module: string,
  nodes: Array<Node.Node>,
  loader: Env.Loader
): Env.Env {
  return {
    book,
    loader,
    node_stack: [],
    return_stack: [
      {
        module,
        nodes,
        index: 0,
      },
    ],
  }
}
