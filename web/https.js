const httpProxy = require("http-proxy")
const fs = require("fs")

const config = {
  target: { host: "0.0.0.0", port: 3000 },
  ssl: {
    key: fs.readFileSync("dialogos.key", "utf8"),
    cert: fs.readFileSync("dialogos.cert", "utf8"),
  },
}

httpProxy.createServer(config).listen(443)
