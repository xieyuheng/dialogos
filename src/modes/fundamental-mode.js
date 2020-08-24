import { contents, mini_message, input_text, mode } from "../stores"
import { reader_input_mode } from "../modes"
import { get } from "svelte/store"
import * as ut from "../ut"
import vm from "@dialogos/vm"

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
