import fastify from "fastify"
import process from "process"
import * as init from "./init"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

const config = {
  logger: {
    prettyPrint: dev ? { colorize: true } : false,
  },
}

async function main() {
  const app = fastify(config)
  await init.app({ app })
  await app.listen(PORT, "0.0.0.0")
}

process.on("unhandledRejection", (error) => {
  console.error(error)
  process.exit(1)
})

main()
