import yaml from "js-yaml"
import process from "process"
import path from "path"
import fs from "fs"

export async function book_load(book, module) {
  if (!process.env.BOOKS) {
    throw new Error(
      `Require $BOOKS to load, book: "${book}", module: "${module}".`
    )
  }
  const file = path.resolve(process.env.BOOKS, book, "src", `${module}.yaml`)
  const text = await fs.promises.readFile(file, "utf-8")
  const contents = yaml.safeLoad(text)
  return contents
}
