import * as Node from "../node"

export type Loader = (name: string, module: string) => Promise<Array<Node.Node>>

export interface Env {
  name: string
  node_stack: Array<Node.Node>
  return_stack: Array<ReturnEntry>
  loader: Loader
}

export interface ReturnEntry {
  nodes: Array<Node.Node>
  index: number
}
