import fastify from "fastify"
import process from "process"
import * as init from "./init"

const { PORT, __PRODUCTION__ } = process.env

const config = {
  logger: {
    prettyPrint: __PRODUCTION__ ? false : { colorize: true },
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
