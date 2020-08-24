import { get } from "svelte/store"
import { contents, mini_message, input_text, mode_name } from "../stores"
import * as ut from "../ut"

export const name = "reader-comment-mode"

export function next() {
  if (ut.string_is_blank(get(input_text))) {
    mini_message.set(`No input text, exit ${name}.`)
    mode_name.set("dialog_mode")
    input_text.set("")
  } else {
    mini_message.set(`Write down reader comment, and exit ${name}.`)
    mode_name.set("dialog_mode")
    contents.set([...get(contents), { ReaderComment: get(input_text) }])
    input_text.set("")
  }
}
