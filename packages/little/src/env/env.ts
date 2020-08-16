import * as Node from "../node"

export type Loader = (book: string, module: string) => Promise<Array<Node.Node>>

export interface Env {
  book: string
  node_stack: Array<Node.Node>
  return_stack: Array<ReturnEntry>
  loader: Loader
}

export interface ReturnEntry {
  module: string
  nodes: Array<Node.Node>
  index: number
}
