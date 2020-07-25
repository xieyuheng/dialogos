import ex from "express"

export function request_time(
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) {
  console.log(`[info] ${req.method} "${req.path}" at ${new Date()}`)
  next()
}

export function cors(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  })
  next()
}

export function undefined_page(req: ex.Request, res: ex.Response) {
  res.status(404).send("undefined page")
}

export function error_handling(
  err: Error,
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) {
  res.type("text/plain")
  res.status(500).send(err.message)
}
