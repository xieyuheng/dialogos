import express from "express"
import compression from "compression"
import path from "path"
import http from "http"
import WebSocket from "ws"
import * as mid from "./mid"
import * as routers from "./routers"
import { logger } from "./logger"

const app = express()

export async function run(
  file: string,
  host: string,
  port: number,
  wsport: number
): Promise<void> {
  const wss = new WebSocket.Server({ port: wsport })

  app.use(compression())
  app.use(mid.request_time)
  app.use(mid.cors)

  app.get("/api", routers.book(path.resolve(file)))

  app.get("/api/book", routers.book(path.resolve(file)))
  app.get(
    "/api/filewatcher",
    routers.filewatcher(wss, path.resolve(file), wsport)
  )

  app.use(mid.error_handling)

  const server = http.createServer(app).listen({ host, port })
  logger.info({
    message: "The liitle book hub begins.",
    host,
    port,
    wsport,
    link: `http://${host}:${port}/api`
  })
}
