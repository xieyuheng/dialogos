import * as little from "../little"
import { LittleNode, LittleElement, LittleText } from "../little"
import * as Err from "../err"
import * as ut from "../ut"
const Window = require("window")
const window = new Window()
const parser = new window.DOMParser()

interface Opts {
  trim: boolean
  no_blank_text_node: boolean
}

export function parse_element(
  text: string,
  opts: Opts = {
    trim: true,
    no_blank_text_node: true,
  }
): LittleElement {
  const document: Document = parser.parseFromString(text, "text/xml")
  return little_from_element(document.documentElement, opts)
}

export function little_from_node(
  node: Node,
  opts: Opts
): undefined | LittleNode {
  if (node.nodeType === window.Node.ELEMENT_NODE) {
    const element = node as Element
    return little_from_element(element, opts)
  } else if (node.nodeType === window.Node.TEXT_NODE) {
    const text = node as Text
    const little_text = little_from_text(text, opts)
    if (ut.blank_p(little_text.text) && opts.no_blank_text_node) {
      return undefined
    } else {
      return little_text
    }
  } else {
    return undefined
  }
}

export function little_from_element(
  element: Element,
  opts: Opts
): LittleElement {
  const tag = element.tagName
  const attributes: { [key: string]: string } = {}
  for (const name of element.getAttributeNames()) {
    attributes[name] = element.getAttribute(name) as string
  }
  const contents = []
  for (const node of Array.from(element.childNodes)) {
    const little_node = little_from_node(node, opts)
    if (little_node !== undefined) {
      contents.push(little_node)
    }
  }
  return new LittleElement(tag, attributes, contents)
}

export function little_from_text(text: Text, opts: Opts): LittleText {
  if (opts.trim) {
    return new LittleText(text.wholeText.trim())
  } else {
    return new LittleText(text.wholeText)
  }
}
