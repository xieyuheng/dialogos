import Fastify from "fastify"
import * as sapper from "@sapper/server"
import compression from "compression"
import path from "path"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

async function server() {
  const fastify = Fastify()
  await fastify.register(require("fastify-express"))
  fastify.use(compression({ threshold: 0 }))
  fastify.register(require("fastify-static"), { root: path.resolve("static") })
  fastify.use(sapper.middleware())
  return fastify
}

server()
  .then((fastify) => fastify.listen(PORT))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
