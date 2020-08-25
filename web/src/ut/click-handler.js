export const click_handler = ({ onclick }) => {
  let lock = false
  return async () => {
    if (lock) return
    lock = true
    await onclick()
    lock = false
  }
}

export const click_handler_with_timeout = ({ onclick, ontimeout, timeout }) => {
  let lock = false
  return async () => {
    if (lock) return
    const t = setTimeout(async () => {
      await ontimeout()
      lock = false
    }, timeout)
    lock = true
    await onclick()
    lock = false
    clearTimeout(t)
  }
}
