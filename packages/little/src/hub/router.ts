import express from "express"

export type Router = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void

export const safe = (
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<void>
) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => fn(req, res, next).catch(next)
