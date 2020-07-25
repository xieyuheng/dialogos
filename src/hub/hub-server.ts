import ex from "express"
import path from "path"
import * as mid from "./mid"
import * as routers from "./routers"

const app = ex()

export function run(file: string, port: number): void {
  app.use(mid.request_time)
  app.use(mid.cors)
  app.get("/api/book", routers.book(path.resolve(file)))
  app.use(mid.error_handling)
  app.listen(port, () => {
    console.log(`[info] The liitle book hub begins on port: ${port}.`)
  })
}
