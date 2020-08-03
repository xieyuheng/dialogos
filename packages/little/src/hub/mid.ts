import express from "express"

export function request_time(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log(`[info] ${req.method} "${req.path}" at ${new Date()}`)
  next()
}

export function cors(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  })
  next()
}

export function undefined_page(req: express.Request, res: express.Response) {
  res.status(404).send("undefined page")
}

export function error_handling(
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.type("text/plain")
  res.status(500).send(error.message)
}
