import * as Env from "../env"
import * as Node from "../node"

export function init(
  name: string,
  nodes: Array<Node.Node>,
  loader: Env.Loader
): Env.Env {
  return {
    name,
    loader,
    node_stack: [],
    return_stack: [
      {
        nodes,
        index: 0,
      },
    ],
  }
}
