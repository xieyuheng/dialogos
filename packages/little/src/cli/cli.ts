import { program } from "@caporal/core"
import * as cli_hub from "./cli-hub"
import * as ut from "../ut"

export function run(config: any): void {
  program.name("little")
  program.version(config.version)
  program.description("Command line interface of the-little-books.")

  program
    .command("help", "Print help message.")
    .default()
    .action(({}) => {
      program.exec(["help"]).catch((error) => {
        console.error(error)
      })
    })

  program
    .command("hub", "An example book server.")
    .argument("<file>", "A xml book file.")
    .option("--port <number>", "port number")
    .action(({ args, options }) => cli_hub.run(is_string(args.file), options))

  program.run()
}

function is_string(x: any): string {
  if (typeof x === "string") {
    return x
  } else {
    throw new Error(`Expecting string while find: ${ut.inspect(x)}.`)
  }
}
