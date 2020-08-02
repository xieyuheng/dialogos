import * as Router from "../router"
import ex from "express"
import chokidar from "chokidar"
import WebSocket from "ws"
import portfinder from "portfinder"

export function websocket(file: string): Router.Router {
    return async (req: ex.Request, res: ex.Response) => {
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

        res.json({ host: req.headers.host?.split(":")[0], port })
    }
}
