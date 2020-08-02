import * as hub from "../hub"
import portfinder from "portfinder"

export function run(file: string, opts: any): void {
  if (opts.port !== undefined) {
    const port = opts.port
    hub.server.run(file, port)
  } else {
    portfinder
      .getPortPromise({ port: 3000 })
      .then((port) => {
        hub.server.run(file, port)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
}
