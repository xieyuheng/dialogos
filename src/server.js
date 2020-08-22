import fastify from "fastify"
import * as sapper from "@sapper/server"
import sirv from "sirv"
import compression from "compression"
import process from "process"
import path from "path"

process.on("unhandledRejection", (error) => {
  console.error(error)
  process.exit(1)
})

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

async function main() {
  const app = fastify({
    logger: {
      prettyPrint: {
        colorize: true,
      },
    },
  })
  await app.register(require("fastify-express"))
  app.use(compression({ threshold: 0 }))
  app.use(sirv("static"))
  app.use(sapper.middleware())
  await app.listen(PORT, "0.0.0.0")
}

main()
