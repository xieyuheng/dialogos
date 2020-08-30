import * as db from "../db"

export class ContentService {
  async get_contents(book, module) {
    return db.load(book, module)
  }
}
