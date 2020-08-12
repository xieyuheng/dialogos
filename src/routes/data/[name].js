import * as db from "../../db"

export async function get(req, res, next) {
  const { name } = req.params

  const data = await db.get(name)

  if (data !== null) {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
  } else {
    next()
  }
}
