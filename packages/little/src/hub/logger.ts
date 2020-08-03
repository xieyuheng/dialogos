import chalk from "chalk"

export const logger = {
  log(the: { level: string; message: string }): void {
    const { level, message } = the
    const head =
      level === "info"
        ? chalk.blue.bold(`[${level}]`)
        : chalk.bold(`[${level}]`)
    const body = message
    console.log(head, body)
  },
}
