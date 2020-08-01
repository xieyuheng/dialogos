import ex from "express"
import path from "path"
import * as mid from "./mid"
import * as routers from "./routers"

import chokidar from "chokidar"
import WebSocket from "ws"

const app = ex()

export function run(file: string, port: number): void {
  app.use(mid.request_time)
  app.use(mid.cors)
  app.get("/api/book", routers.book(path.resolve(file)))
  app.use(mid.error_handling)
  app.listen(port, () => {
    console.log(`[info] The liitle book hub begins on port: ${port}.`)
  })

  const wss = new WebSocket.Server({ port: port + 1 })

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      if (message === "watch") {
        chokidar.watch(file).on("all", (event, path) => {
          ws.send(`event: ${event}, path: ${path}`)
        })
      }
    })
  })
}
