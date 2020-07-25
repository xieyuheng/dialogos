import * as Node from "../node"
import * as ut from "../ut"
import path from "path"
import fs from "fs"

const file = "../../docs/didactics-reports/report-on-the-little-typer.xml"
const text = fs.readFileSync(path.resolve(__dirname, file), {
  encoding: "utf-8",
})
console.log(ut.inspect(Node.parse_element(text)))