import { LittleNode, LittleElement, LittleText } from "../little"
import pt from "@forchange/partech"
import rr from "@forchange/readable-regular-expression"

const str = pt.Sym.create_par_from_kind("string", { name: "string" })

function str_matcher(tree: pt.Tree.Tree): string {
  const s = pt.Tree.token(tree).value
  return s.slice(1, s.length - 1)
}

const num = pt.Sym.create_par_from_kind("number", { name: "number" })

function num_matcher(tree: pt.Tree.Tree): number {
  const s = pt.Tree.token(tree).value
  return Number.parseInt(s)
}

export function little_node(): pt.Sym.Rule {
  return pt.Sym.create_rule("little_node", {
    little_element: [little_element],
    little_text: [little_element],
  })
}

export function little_element(): pt.Sym.Rule {
  return pt.Sym.create_rule("little_element", {
    // TODO
  })
}

export function little_text(): pt.Sym.Rule {
  return pt.Sym.create_rule("little_text", {
    // TODO
  })
}
