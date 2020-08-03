import * as Router from "../router"
import { logger } from "../logger"
import chokidar from "chokidar"
import WebSocket from "ws"

export function filewatcher(
  wss: WebSocket.Server,
  file: string,
  port: number
): Router.Router {
  return Router.safe(async (req, res) => {
    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        if (message === "watch") {
          chokidar.watch(file).on("all", (event, path) => {
            ws.send(`event: ${event}, path: ${path}`)
          })
        }
      })
    })

    const info = {
      host: req.headers.host?.split(":")[0],
      port,
    }

    res.json(info)
  })
}
