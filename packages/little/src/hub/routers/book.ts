import * as Router from "../router"
import * as Node from "../../node"
import path from "path"
import fs from "fs"
import ex from "express"

export function book(file: string): Router.Router {
  return async (_req: ex.Request, res: ex.Response) => {
    const text = fs.readFileSync(path.resolve(file), { encoding: "utf-8" })
    res.json(Node.parse_element(text))
  }
}
