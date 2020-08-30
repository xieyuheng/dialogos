import { ContentService } from "../../services"

export async function get(req, res, next) {
  const { params, query } = req
  const module = query.module || "index"

  const data = await new ContentService().get_contents(params.book, module)
  if (data !== null) {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
  } else {
    next()
  }
}
