import li from "@the-little-books/little"
import process from "process"
import path from "path"
import fs from "fs"

export async function load(name, module) {
  if (!process.env.BOOKS) {
    throw new Error(
      li.ut.aline(`
        |To load nodes, I need the $BOOKS env var,
        |since it is not provided, I can not load.
        |- name: "${name}"
        |- module: "${module}"
        |`)
    )
  }
  const file = path.resolve(process.env.BOOKS, name, `${module}.xml`)
  const text = await fs.promises.readFile(file, "utf-8")
  const nodes = li.Node.parse_nodes(text)
  return nodes
}
