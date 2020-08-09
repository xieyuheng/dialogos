import { h, text } from "hyperapp"
import li, { p, v } from "@the-little-books/little"
import "./card.css"

export const card = (data) =>
  li.cases(data, [
    [
      p("card", [p("title", v("title")), v("content")]),
      ({ vars: { title, content } }) =>
        h("div", { class: "card" }, [
          h("h3", { class: "card-title" }, text(title.value)),
          h("pre", {}, text(content.value)),
        ]),
    ],
  ])
