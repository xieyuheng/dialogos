export function string_is_blank(str) {
  return str.replace(/\s/g, "").length === 0
}
