import * as Router from "../router"
import * as little from "../../little"
import readdir_rec from "fs-readdir-recursive"
import path from "path"
import fs from "fs"
import ex from "express"

export function book(file: string): Router.Router {
  return (req: ex.Request, res: ex.Response) => {
    const text = fs.readFileSync(path.resolve(file), { encoding: "utf-8" })
    res.json(little.parse_element(text))
  }
}
