import { writable } from "svelte/store"
import { fundamental_mode } from "../modes"

export const input_text = writable("")
export const contents = writable([])
export const mini_message = writable("")
export const mode = writable(fundamental_mode)
export const mode_stack = writable([])
export const env = writable(null)
