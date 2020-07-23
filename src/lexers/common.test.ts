import * as common from "./common"
import pt from "@forchange/partech"

pt.ut.assert_equal_tokens(
  common.lexer.lex("山川壯麗，物產豐隆，炎黃世胄，東亞稱雄。"),
  [
    { kind: "identifier", value: "山川壯麗" },
    { kind: "symbol", value: "，" },
    { kind: "identifier", value: "物產豐隆" },
    { kind: "symbol", value: "，" },
    { kind: "identifier", value: "炎黃世胄" },
    { kind: "symbol", value: "，" },
    { kind: "identifier", value: "東亞稱雄" },
    { kind: "symbol", value: "。" },
  ]
)

pt.ut.assert_equal_tokens(common.lexer.lex("_"), [
  { kind: "identifier", value: "_" },
])

pt.ut.assert_equal_tokens(common.lexer.lex("_123"), [
  { kind: "identifier", value: "_123" },
])

pt.ut.assert_equal_tokens(common.lexer.lex("123 321"), [
  { kind: "number", value: "123" },
  { kind: "number", value: "321" },
])

pt.ut.assert_equal_tokens(common.lexer.lex("-123 -321"), [
  { kind: "number", value: "-123" },
  { kind: "number", value: "-321" },
])

pt.ut.assert_equal_tokens(common.lexer.lex("pi: 3.14"), [
  { kind: "identifier", value: "pi" },
  { kind: "symbol", value: ":" },
  { kind: "number", value: "3.14" },
])

pt.ut.assert_equal_tokens(common.lexer.lex("()"), [
  { kind: "symbol", value: "(" },
  { kind: "symbol", value: ")" },
])

pt.ut.assert_equal_tokens(common.lexer.lex("-=:.,;~!?@#$%^&*+<>()[]{}/|\\"), [
  { kind: "symbol", value: "-" },
  { kind: "symbol", value: "=" },
  { kind: "symbol", value: ":" },
  { kind: "symbol", value: "." },
  { kind: "symbol", value: "," },
  { kind: "symbol", value: ";" },
  { kind: "symbol", value: "~" },
  { kind: "symbol", value: "!" },
  { kind: "symbol", value: "?" },
  { kind: "symbol", value: "@" },
  { kind: "symbol", value: "#" },
  { kind: "symbol", value: "$" },
  { kind: "symbol", value: "%" },
  { kind: "symbol", value: "^" },
  { kind: "symbol", value: "&" },
  { kind: "symbol", value: "*" },
  { kind: "symbol", value: "+" },
  { kind: "symbol", value: "<" },
  { kind: "symbol", value: ">" },
  { kind: "symbol", value: "(" },
  { kind: "symbol", value: ")" },
  { kind: "symbol", value: "[" },
  { kind: "symbol", value: "]" },
  { kind: "symbol", value: "{" },
  { kind: "symbol", value: "}" },
  { kind: "symbol", value: "/" },
  { kind: "symbol", value: "|" },
  { kind: "symbol", value: "\\" },
])

pt.ut.assert_equal_tokens(common.lexer.lex('"("  ")"'), [
  { kind: "string", value: '"("' },
  { kind: "string", value: '")"' },
])

pt.ut.assert_equal_tokens(common.lexer.lex('pre "abc" post'), [
  { kind: "identifier", value: "pre" },
  { kind: "string", value: '"abc"' },
  { kind: "identifier", value: "post" },
])

pt.ut.assert_equal_tokens(common.lexer.lex(String.raw`pre "a \"b\" c" post`), [
  { kind: "identifier", value: "pre" },
  { kind: "string", value: String.raw`"a \"b\" c"` },
  { kind: "identifier", value: "post" },
])
