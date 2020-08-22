export type Loader = (book: string, module: string) => Promise<Array<any>>

export interface Env {
  book: string
  data_stack: Array<any>
  return_stack: Array<ReturnEntry>
  loader: Loader
}

export interface ReturnEntry {
  module: string
  stmts: Array<any>
  index: number
}
