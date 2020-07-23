import * as little from "../little"
import { LittleNode, LittleElement, LittleText } from "../little"

const Window = require("window")
const window = new Window()
const parser = new window.DOMParser()

export function parse_element(
  text: string,
  opts: little.Opts = {
    trim: true,
    no_blank_text_node: true,
  }
): LittleElement {
  const document: Document = parser.parseFromString(text, "text/xml")
  return little.from_element(document.documentElement, opts)
}
