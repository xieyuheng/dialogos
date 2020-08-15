export const click_handler = ({ onclick, ontimeout, timeout }) => {
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
