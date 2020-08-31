import assert from "assert-diff"
assert.options.strict = true

export function assert_equal(x, y, desc) {
  assert.deepEqual(x, y, desc || "should be equal")
}
