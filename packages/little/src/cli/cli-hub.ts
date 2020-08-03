import * as hub from "../hub"
import get_port from "get-port"

export async function run(file: string, opts: any): Promise<void> {
  const port = opts.port || (await get_port({ port: 3000 }))
  const wsport = await get_port({ port })

  hub.server.run(file, port, wsport)
}
