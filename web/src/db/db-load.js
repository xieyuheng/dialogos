import yaml from "js-yaml"
import process from "process"
import path from "path"
import fs from "fs"
import ut from "../ut"

export async function load(book, module) {
  if (!process.env.BOOKS) {
    throw new Error(
      ut.aline(`
        |To load contents, I need the $BOOKS env var,
        |since it is not provided, I can not load.
        |- book: "${book}"
        |- module: "${module}"
        |`)
    )
  }
  const file = path.resolve(process.env.BOOKS, book, `${module}.yaml`)
  const text = await fs.promises.readFile(file, "utf-8")
  const contents = yaml.safeLoad(text)
  return contents
}
