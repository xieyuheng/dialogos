import fastify_express from "fastify-express"
import compression from "compression"
import helmet from "helmet"
import contents_routes from "../routes/contents"

export async function init_app({ app }) {
  await app.register(fastify_express)
  app.use(compression({ threshold: 0 }))
  app.use(helmet())
  app.register(contents_routes)
}
