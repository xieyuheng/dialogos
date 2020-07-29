import { h, text, app } from "hyperapp"
import li, { p, v } from "little"
import "./index.css"

// -- EFFECTS & SUBSCRIPTIONS --

const fetchJSONData = (dispatch, options) => {
  fetch(options.url)
    .then((response) => response.json())
    .then((data) => dispatch(options.onresponse, data))
    .catch(() => dispatch(options.onresponse, null))
}

// -- ACTIONS --

const GotBook = (state, book) => ({ ...state, book })

// -- VIEWS ---

const titleView = (state) =>
  state.book &&
  li.match(state.book, [
    [
      p("book", [p("title", v("title"))], { tail: "_" }),
      ({ vars: { title } }) => h("h1", {}, text(title.value)),
    ],
  ])

const frameView = (state, frame, index) =>
  li.match(frame, [
    [
      p("dialog", [
        p("question", [v("question")], { tail: "question_notes" }),
        p("answer", [v("answer")], { tail: "answer_notes" }),
      ]),
      ({ vars: { question, answer } }) =>
        h("div", { class: "dialog" }, [
          h("pre", { class: "question" }, text(question.value)),
          h("pre", { class: "index" }, text(index + 1)),
          h("pre", { class: "answer" }, text(answer.value)),
        ]),
    ],
    [
      p("card", [p("title", v("title")), v("content")]),
      ({ vars: { title, content } }) =>
        h("div", { class: "card" }, [
          h("h3", { class: "title" }, text(title.value)),
          h("pre", {}, text(text.content)),
        ]),
    ],
    ["default", () => null],
  ])

const chapterView = (state, chapter, index) =>
  state.book &&
  li.match(chapter, [
    [
      p("chapter", p("title", v("title")), { tail: "frames" }),
      ({ tails: { frames } }) =>
        h(
          "div",
          { class: "chapter" },
          h(
            "div",
            { class: "frames" },
            frames.map((frame, index) => frameView(state, frame, index))
          )
        ),
    ],
  ])

const chapterList = (state) =>
  state.book &&
  li.match(state.book, [
    [
      p("book", [p("title", v("title")), v("preface")], {
        tail: "chapters",
      }),
      ({ tails: { chapters } }) =>
        h(
          "div",
          { class: "chapters" },
          chapters.map((chapter, index) => chapterView(state, chapter, index))
        ),
    ],
  ])

const container = (contents) => h("div", { class: "container" }, contents)

// -- RUN --

const hub = "http://localhost:3000/api"

app({
  init: [
    { book: null },
    [fetchJSONData, { url: `${hub}/book`, onresponse: GotBook }],
  ],

  node: document.getElementById("app"),

  view: (state) => container([titleView(state), chapterList(state)]),
})
