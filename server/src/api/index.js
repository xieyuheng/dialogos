import book from "./book"

export default async function (app, opts, done) {
  app.register(book)
  done()
}
