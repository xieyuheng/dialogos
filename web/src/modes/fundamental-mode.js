import { get } from "svelte/store"
import vm from "@dialogos/vm"
import { reader_comment_mode } from "../modes"

export function fundamental_mode(stores) {
  const { contents, mini_message, mode, mode_stack, env } = stores

  return {
    async ok() {
      const loading = { Loading: "Loading next statement... ⏳" }
      contents.set([...get(contents), loading])
      const content = await vm.Env.next(get(env))
      get(contents).pop()
      contents.set([...get(contents), content])
      mini_message.set("")
    },

    ok_icon: {
      src: "cute-circled-chevron-down-64px.png",
      alt: "next",
    },

    status_icon: {
      src: "cute-dialog-64px.png",
      alt: "dialog",
    },

    input_buffer_focus() {
      get(mode_stack).push(get(mode))
      mini_message.set(`Entering reader_comment_mode from ${get(mode).name}.`)
      mode.set(reader_comment_mode)
    },
  }
}
