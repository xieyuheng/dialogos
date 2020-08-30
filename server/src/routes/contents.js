import { ContentService } from "../services"

export default async function routes(app, opts, done) {
  app.get("/:book", async (request, reply) => {
    const { params, query } = request
    const module = query.module || "index"
    return await new ContentService().get_contents(params.book, module)
  })

  done()
}
