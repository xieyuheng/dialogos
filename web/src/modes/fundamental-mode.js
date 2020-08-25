import { get } from "svelte/store"
import * as ut from "../ut"
import vm from "@dialogos/vm"
import { reader_comment_mode } from "../modes"
import { contents, mini_message, input_text, mode, mode_stack } from "../stores"

export const name = "fundamental-mode"

export async function ok({ env }) {
  contents.set([...get(contents), { Loading: "Loading next statement... ⏳" }])
  const content = await vm.Env.next(env)
  get(contents).pop()
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

export const input_buffer_focus = () => {
  get(mode_stack).push(get(mode))
  mini_message.set(
    `Entering ${reader_comment_mode.name} from ${get(mode).name}.`
  )
  mode.set(reader_comment_mode)
}