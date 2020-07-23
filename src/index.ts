import jsdom from "jsdom"
import path from "path"
import fs from "fs"
import * as ut from "./ut"

const file = "../docs/didactics-reports/report-on-the-little-typer.xml"

fs.readFile(path.resolve (__dirname, file), (err, text) => {
  console.log(new jsdom.JSDOM(text))
})
