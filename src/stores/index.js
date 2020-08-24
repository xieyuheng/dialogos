import { writable } from "svelte/store"

export const input_text = writable("")
export const contents = writable([])
export const mini_message = writable("")
export const mode = writable(null)
