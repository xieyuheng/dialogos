export type Loader = (book: string, module: string) => Promise<Array<any>>

export interface Env {
  book: string
  node_stack: Array<any>
  return_stack: Array<ReturnEntry>
  loader: Loader
}

export interface ReturnEntry {
  module: string
  nodes: Array<any>
  index: number
}
