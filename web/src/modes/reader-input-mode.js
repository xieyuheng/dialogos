import { get } from "svelte/store"
import * as ut from "../ut"

export function reader_input_mode(stores) {
  const { contents, mini_message, input_text, mode, mode_stack, env } = stores

  const name = "reader-input-mode"

  async function ok({ next }) {
    if (ut.string_is_blank(get(input_text))) {
      mini_message.set(
        "The input buffer is empty. You should enter your answer."
      )
    } else {
      const input = get(input_text)
      const input_parser_name = get(env).data_stack.pop()
      const data = input_parsers[input_parser_name](input)
      console.log("input_parsers:", { data })
      get(env).data_stack.push(data)
      contents.set([...get(contents), { ReaderInput: input }])
      input_text.set("")
      mode.set(get(mode_stack).pop())
      mini_message.set(`Back to ${get(mode)(stores).name} from ${name}.`)
      await next()
    }
  }

  const ok_icon = {
    src: "cute-paper-plane-64px.png",
    alt: "send",
  }

  const status_icon = {
    src: "cute-ask-question-64px.png",
    alt: "input",
  }

  return { name, ok, ok_icon, status_icon }
}

const true_like_words = ["yes", "y", "ok", "t", "1", "是", "是的", "好的", "好"]

const false_like_words = [
  "no",
  "n",
  "sorry",
  "f",
  "0",
  "nil",
  "不好",
  "不",
  "不是",
  "否",
]

const input_parsers = {
  to_boolean: (input) => {
    if (typeof input === "string") {
      const text = input
        .toLowerCase()
        .replace(/\p{Punctuation}/gu, "")
        .replace(/\s/g, "")
      if (true_like_words.includes(text)) return true
      else if (false_like_words.includes(text)) return false
      else return input
    } else {
      return input
    }
  },
  raw_input: (input) => input,
}
