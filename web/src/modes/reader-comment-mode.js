import { get } from "svelte/store"
import * as ut from "../ut"

export function reader_comment_mode(stores) {
  const { contents, mini_message, input_text, mode, mode_stack } = stores

  return {
    ok() {
      mode.set(get(mode_stack).pop())
      if (ut.string_is_blank(get(input_text))) {
        mini_message.set(`No input text, exit ${name}.`)
      } else {
        mini_message.set(`Write down reader comment, and exit ${name}.`)
        contents.set([...get(contents), { ReaderComment: get(input_text) }])
      }
      input_text.set("")
    },

    ok_icon: {
      src: "cute-ok-64px.png",
      alt: "edit",
    },

    status_icon: {
      src: "cute-edit-file-64px.png",
      alt: "comment",
    },
  }
}
