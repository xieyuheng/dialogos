import * as Node from "../node"

const Window = require("window")
const window = new Window()
const parser = new window.DOMParser()

export function parse_element(
  text: string,
  opts: Node.Opts = {
    trim: true,
    no_blank_text_node: true,
  }
): Node.Element {
  const document: Document = parser.parseFromString(text, "text/xml")
  return Node.from_element(document.documentElement, opts)
}
