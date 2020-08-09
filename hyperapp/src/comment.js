import { h, text } from "hyperapp"
import li, { p, v } from "@the-little-books/little"
import "./comment.css"

export const comment = (data) =>
  li.cases(data, [
    [
      p("comment", [p("title", v("title")), v("content")]),
      ({ vars: { title, content } }) =>
        h("div", { class: "comment" }, [
          h("h3", { class: "comment-title" }, text(title.value)),
          h("br", {}),
          h("pre", {}, text(content.value)),
        ]),
    ],
    [
      p("comment", [v("content")]),
      ({ vars: { title, content } }) =>
        h("div", { class: "comment" }, [h("pre", {}, text(content.value))]),
    ],
  ])
