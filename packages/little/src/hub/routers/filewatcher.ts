import * as Router from "../router"
import { logger } from "../logger"
import chokidar from "chokidar"
import WebSocket from "ws"

const MAX_LISTENERS = Infinity

export function filewatcher(
  wss: WebSocket.Server,
  file: string,
  port: number
): Router.Router {
  return Router.safe(async (req, res) => {
    wss.setMaxListeners(MAX_LISTENERS)
    wss.on("connection", (ws) => {
      ws.setMaxListeners(MAX_LISTENERS)
      ws.on("message", (message) => {
        if (message === "watch") {
          chokidar.watch(file).on("change", (path) => {
            const message = `file changed: ${path}`
            logger.info({ message: "File changed.", file: path })
            ws.send(message)
          })
        }
      })
    })

    res.json({
      host: req.headers.host?.split(":")[0],
      port,
    })
  })
}
