import ex from "express"

export type Router = (req: ex.Request, res: ex.Response) => void
