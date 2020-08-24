import { contents, mini_message, input_text, mode } from "../stores"
import { dialog_mode } from "../modes"
import { get } from "svelte/store"
import * as ut from "../ut"

export const name = "reader-comment-mode"

export function ok() {
  if (ut.string_is_blank(get(input_text))) {
    mini_message.set(`No input text, exit ${name}.`)
    mode.set(dialog_mode)
    input_text.set("")
  } else {
    mini_message.set(`Write down reader comment, and exit ${name}.`)
    mode.set(dialog_mode)
    contents.set([...get(contents), { ReaderComment: get(input_text) }])
    input_text.set("")
  }
}

export const ok_icon = {
  src: "cute-ok-64px.png",
  alt: "edit",
}

export const status_icon = {
  src: "cute-edit-file-64px.png",
  alt: "comment",
}
