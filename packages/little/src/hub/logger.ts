import prettyjson from "prettyjson"
import chalk from "chalk"

export const logger = {
  info(body: object): void {
    console.log(chalk.blue.bold("[info]"))
    console.log(prettyjson.render(body))
    console.log()
  },
}
