import * as Pattern from "../pattern"
import * as Node from "../node"
import * as ut from "../ut"

ut.assert_equal(
  Pattern.match(
    { kind: "Pattern.Text", text: "a" },
    { kind: "Node.Text", text: "b" }
  ),
  null
)

ut.assert_equal(
  Pattern.match(
    { kind: "Pattern.Text", text: "a" },
    { kind: "Node.Text", text: "a" }
  ),
  new Pattern.MatchResult()
)

ut.assert_equal(
  Pattern.match(
    {
      kind: "Pattern.Element",
      tag: "frame",
      attributes: {},
      contents: [
        {
          kind: "Pattern.Element",
          tag: "question",
          attributes: {},
          contents: [{ kind: "Pattern.Var", name: "x" }],
        },
      ],
    },
    {
      kind: "Node.Element",
      tag: "frame",
      attributes: {},
      contents: [
        {
          kind: "Node.Element",
          tag: "question",
          attributes: {},
          contents: [{ kind: "Node.Text", text: "a" }],
        },
      ],
    }
  ),
  new Pattern.MatchResult({ x: { kind: "Node.Text", text: "a" } }, {})
)

ut.assert_equal(
  Pattern.match(
    {
      kind: "Pattern.Element",
      tag: "frame",
      attributes: {},
      contents: [
        {
          kind: "Pattern.Element",
          tag: "question",
          attributes: {},
          contents: [{ kind: "Pattern.Var", name: "x" }],
        },
      ],
    },
    {
      kind: "Node.Element",
      tag: "frame",
      attributes: {},
      contents: [
        {
          kind: "Node.Element",
          tag: "question",
          attributes: {},
          contents: [
            { kind: "Node.Text", text: "a" },
            { kind: "Node.Text", text: "b" },
          ],
        },
      ],
    }
  ),
  null
)

ut.assert_equal(
  Pattern.match(
    {
      kind: "Pattern.Element",
      tag: "frame",
      attributes: {},
      contents: [
        {
          kind: "Pattern.Element",
          tag: "question",
          attributes: {},
          contents: [{ kind: "Pattern.Var", name: "x" }],
          tail: "t",
        },
      ],
    },
    {
      kind: "Node.Element",
      tag: "frame",
      attributes: {},
      contents: [
        {
          kind: "Node.Element",
          tag: "question",
          attributes: {},
          contents: [
            { kind: "Node.Text", text: "a" },
            { kind: "Node.Text", text: "b" },
            { kind: "Node.Text", text: "c" },
          ],
        },
      ],
    }
  ),
  new Pattern.MatchResult(
    { x: { kind: "Node.Text", text: "a" } },
    {
      t: [
        { kind: "Node.Text", text: "b" },
        { kind: "Node.Text", text: "c" },
      ],
    }
  )
)
