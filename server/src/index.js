import fastify from "fastify"
import fastify_express from "fastify-express"
import compression from "compression"
import helmet from "helmet"
import process from "process"
import path from "path"
import fs from "fs"
import contents_routes from "./routes/contents"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

const config = {
  logger: {
    prettyPrint: dev ? { colorize: true } : false,
  },
}

async function main() {
  const app = fastify(config)
  await app.register(fastify_express)
  app.use(compression({ threshold: 0 }))
  app.use(helmet())
  app.register(contents_routes)
  await app.listen(PORT, "0.0.0.0")
}

process.on("unhandledRejection", (error) => {
  console.error(error)
  process.exit(1)
})

main()
