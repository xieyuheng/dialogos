import * as Router from "../router"
import chokidar from "chokidar"
import WebSocket from "ws"
import portfinder from "portfinder"

export function websocket(file: string): Router.Router {
  return Router.safe(async (req, res) => {
    const port = await portfinder.getPortPromise({ port: 3000 })
    const wss = new WebSocket.Server({ port })
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
