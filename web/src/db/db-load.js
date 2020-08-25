import vm from "@dialogos/vm"
import yaml from "js-yaml"
import process from "process"
import path from "path"
import fs from "fs"

export async function load(book, module) {
  if (!process.env.BOOKS) {
    throw new Error(
      vm.ut.aline(`
        |To load contents, I need the $BOOKS env var,
        |since it is not provided, I can not load.
        |- book: "${book}"
        |- module: "${module}"
        |`)
    )
  }
  const file = path.resolve(process.env.BOOKS, book, `${module}.yaml`)
  const text = await fs.promises.readFile(file, "utf-8")
  return yaml.safeLoad(text)
}
