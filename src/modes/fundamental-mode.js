import { contents, mini_message, input_text, mode } from "../stores"
import { reader_input_mode } from "../modes"
import { get } from "svelte/store"
import * as ut from "../ut"
import vm from "@dialogos/vm"

export const name = "fundamental-mode"

export async function ok({ env }) {
  contents.set([...get(contents), { Loading: "Loading next statement... ⏳" }])
  // TODO fix this use of stmts like GET_READER_INPUT in book.
  const content = await vm.Env.next(env)
  get(contents).pop()

  let prompt_contents = vm.Env.match_stmt_name(content, "GET_READER_INPUT")
  if (prompt_contents) {
    contents.set([...get(contents), ...prompt_contents])
    mode.set(reader_input_mode)
    mini_message.set(`Entering ${reader_input_mode.name}.`)
    return
  }

  contents.set([...get(contents), content])
  mini_message.set("")
}

export const ok_icon = {
  src: "cute-circled-chevron-down-64px.png",
  alt: "next",
}

export const status_icon = {
  src: "cute-dialog-64px.png",
  alt: "dialog",
}
