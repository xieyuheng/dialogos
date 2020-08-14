import li from "@the-little-books/little"
import process from "process"
import path from "path"
import fs from "fs"

export async function get(name, module) {
  if (!process.env.BOOKS) {
    throw new Error(
      li.ut.aline(`
        |To get the data of a name,
        |I need the $BOOKS env var,
        |since it is not provided,
        |I can not get the data for name:
        |  "${name}"
        |`)
    )
  }
  const file = path.resolve(process.env.BOOKS, name, `${module}.xml`)
  const text = await fs.promises.readFile(file, "utf-8")
  return li.Node.parse_nodes(text)
}
