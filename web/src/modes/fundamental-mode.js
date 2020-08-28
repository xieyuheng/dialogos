import { get } from "svelte/store"
import * as ut from "../ut"
import vm from "@dialogos/vm"
import { reader_comment_mode } from "../modes"

export function fundamental_mode(stores) {
  const { contents, mini_message, input_text, mode, mode_stack, env } = stores

  return {
    name: "fundamental-mode",

    async ok() {
      contents.set([
        ...get(contents),
        { Loading: "Loading next statement... ⏳" },
      ])
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
      mini_message.set(
        `Entering ${reader_comment_mode(stores).name} from ${
          get(mode)(stores).name
        }.`
      )
      mode.set(reader_comment_mode)
    },
  }
}
