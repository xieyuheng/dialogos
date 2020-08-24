import { contents, mini_message, input_text, mode } from "../stores"
import { dialog_mode } from "../modes"
import { get } from "svelte/store"
import * as ut from "../ut"
import yaml from "js-yaml"

export const name = "reader-input-mode"

export async function ok({ env, next }) {
  if (ut.string_is_blank(get(input_text))) {
    mini_message.set("The input buffer is empty. You should enter your answer.")
  } else {
    const data = yaml.safeLoad(get(input_text))
    env.data_stack.push(data)
    contents.set([...get(contents), { ReaderInput: data }])
    input_text.set("")
    mode.set(dialog_mode)
    mini_message.set("Back to dialog_mode from reader_input_mode.")
    await next()
  }
}

export const ok_icon = {
  src: "cute-paper-plane-64px.png",
  alt: "send",
}

export const status_icon = {
  src: "cute-ask-question-64px.png",
  alt: "input",
}
