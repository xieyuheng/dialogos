import * as hub from "../hub"
import portfinder from "portfinder"

export async function run(file: string, opts: any): Promise<void> {
  const port = opts.port || (await portfinder.getPortPromise({ port: 3000 }))
  const wsport = await portfinder.getPortPromise({ port: port + 100 })
  hub.server.run(file, port, wsport)
}
