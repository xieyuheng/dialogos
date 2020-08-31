import * as db from "../db"

export class ContentService {
  async get_contents(book, module) {
    return db.book_load(book, module)
  }
}
