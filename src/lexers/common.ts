import pt from "@forchange/partech"
import rr from "@forchange/readable-regular-expression"
import * as ut from "../ut"

const legal_head = /[_\p{Letter}]/
const legal_body = /[_\p{Letter}0-9]/
const illegal_body = /[^_\p{Letter}0-9\s]/

const identifier = rr.add_flag(
  rr.seq(rr.beginning, rr.seq(legal_head, rr.zero_or_more(legal_body))),
  rr.flags.unicode
)

const sym = rr.add_flag(rr.seq(rr.beginning, illegal_body), rr.flags.unicode)

// NOTE does not handle multiline string.
const doublequote_str = rr.seq(
  rr.beginning,
  '"',
  rr.zero_or_more(
    rr.or(
      // NOTE the order matters
      '\\"',
      /[^\"]/
    )
  ),
  '"'
)

const num = rr.seq(
  rr.beginning,
  rr.or(
    // NOTE the order matters.
    rr.seq(rr.one_or_more(rr.digit), /\./, rr.one_or_more(rr.digit)),
    rr.one_or_more(rr.digit),
    rr.seq("-", rr.one_or_more(rr.digit), /\./, rr.one_or_more(rr.digit)),
    rr.seq("-", rr.one_or_more(rr.digit))
  )
)

// NOTE the order matters.
export const part = pt.Par.re(identifier)
  .map((value) => ({ kind: "identifier", value }))
  .or(pt.Par.re(doublequote_str).map((value) => ({ kind: "string", value })))
  .or(pt.Par.re(num).map((value) => ({ kind: "number", value })))
  .or(pt.Par.re(sym).map((value) => ({ kind: "symbol", value })))

const spaces = pt.Par.re(rr.seq(rr.beginning, rr.zero_or_more(rr.space)))

const par = new pt.Par.Par((st) => {
  spaces.parse(st)
  const result = part.parse(st)
  spaces.parse(st)
  return result
})

export function lex(input: string): Array<pt.Token.Token> {
  const st = new pt.St.St(input, null)
  return pt.Par.zero_or_more(pt.Par.add_span(par)).parse(st)
}

export const lexer = new pt.Lexer.Lexer(lex)
