import * as db from "../../db"

export async function get(req, res, next) {
  const { params, query } = req
  const module = query.module || "index"

  const data = await db.load(params.name, module)

  if (data !== null) {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
  } else {
    next()
  }
}
