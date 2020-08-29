import fastify from "fastify"
import * as sapper from "@sapper/server"
import sirv from "sirv"
import compression from "compression"
import helmet from "helmet"
import process from "process"
import path from "path"
import fs from "fs"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

const config = {
  logger: {
    prettyPrint: dev ? { colorize: true } : false,
  },
}

async function main() {
  const app = fastify(config)
  await app.register(require("fastify-express"))
  app.use(compression({ threshold: 0 }))
  app.use(sirv("static"))
  app.use(sapper.middleware())
  app.use(helmet())
  await app.listen(PORT, "0.0.0.0")
}

process.on("unhandledRejection", (error) => {
  console.error(error)
  process.exit(1)
})

main()
