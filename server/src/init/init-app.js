import fastify_express from "fastify-express"
import fastify_cors from "fastify-cors"
import compression from "compression"
import helmet from "helmet"
import contents_routes from "../routes/contents"

export async function app({ app }) {
  await app.register(fastify_express)
  app.register(fastify_cors, {
    origin: "*",
  })
  app.use(compression({ threshold: 0 }))
  app.use(helmet())
  app.register(contents_routes)
}
