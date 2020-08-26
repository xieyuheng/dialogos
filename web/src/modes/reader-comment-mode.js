import { get } from "svelte/store"
import * as ut from "../ut"

export function reader_comment_mode(stores) {
  const { contents, mini_message, input_text, mode, mode_stack } = stores

  const name = "reader-comment-mode"

  function ok() {
    mode.set(get(mode_stack).pop())
    if (ut.string_is_blank(get(input_text))) {
      mini_message.set(`No input text, exit ${name}.`)
    } else {
      mini_message.set(`Write down reader comment, and exit ${name}.`)
      contents.set([...get(contents), { ReaderComment: get(input_text) }])
    }
    input_text.set("")
  }

  const ok_icon = {
    src: "cute-ok-64px.png",
    alt: "edit",
  }

  const status_icon = {
    src: "cute-edit-file-64px.png",
    alt: "comment",
  }

  return { name, ok, ok_icon, status_icon }
}
