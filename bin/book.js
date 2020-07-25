#!/usr/bin/env node

const pkg = require("../package.json")
const cli = require("../lib/cli/cli")
const process = require("process")

process.on("unhandledRejection", (error) => {
  console.error(error)
  process.exit(1)
})

cli.run({
  version: pkg.version,
})
