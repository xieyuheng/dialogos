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
  fastify.use(require("sirv")("static"))
  fastify.use(sapper.middleware())
  return fastify
}

server()
  .then((fastify) => fastify.listen(PORT, "0.0.0.0"))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
