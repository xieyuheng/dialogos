import express from "express"
import compression from "compression"
import * as sapper from "@sapper/server"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

const app = express()

app.use(compression({ threshold: 0 }))
app.use(express.static("static"))
app.use(sapper.middleware())

app.listen(PORT, (err) => {
  if (err) console.error("error", err)
})
