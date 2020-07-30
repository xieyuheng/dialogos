import { h, text, app } from "hyperapp"
import li, { p, v } from "little"
import "./index.css"

// -- EFFECTS & SUBSCRIPTIONS --

const fetchJSONData = (dispatch, opts) => {
  fetch(opts.url)
    .then((response) => response.json())
    .then((data) => dispatch(opts.onresponse, data))
    .catch(() => dispatch(opts.onresponse, null))
}

// -- ACTIONS --

const GotBook = (state, book) => ({ ...state, book })

// -- VIEWS ---

const frontCover = (state, data) =>
  li.match(data, [
    [
      p(
        "book",
        p("info", [
          p("title", v("title")),
          p("authors", v("authors")),
          p("date", v("date")),
        ])
      ),
      ({ vars: { title, authors, date } }) =>
        h("div", { class: "front-cover" }, [
          h("h1", { class: "book-title" }, text(title.value)),
          h("h2", { class: "book-authors" }, h("pre", {}, text(authors.value))),
          h("h3", { class: "book-date" }, h("pre", {}, text(date.value))),
        ]),
    ],
  ])

const chapterList = (state, data) =>
  li.match(data, [
    [
      p("book", [v("_info"), v("_preface")], { tail: "chapters" }),
      ({ tails: { chapters } }) =>
        h(
          "div",
          { class: "chapters" },
          chapters.map((chapter, index) => chapterView(state, chapter, index))
        ),
    ],
  ])

const chapterView = (state, data, index) =>
  li.match(data, [
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

const markup = (state, str) => {
  const result = str.match(/^(.*?)\^\[(.*?)\](.*)/msu)

  if (result !== null) {
    const [_target, prev, name, rest] = result
    return [
      text(prev),
      h("span", { class: "note-name" }, text(name)),
      ...markup(state, rest),
    ]
  } else {
    return [text(str)]
  }
}

const frameView = (state, data, index) =>
  li.match(data, [
    [
      p("dialog", [
        p("question", [v("question")], { tail: "question_notes" }),
        p("answer", [v("answer")], { tail: "answer_notes" }),
      ]),
      ({
        vars: { question, answer },
        tails: { question_notes, answer_notes },
      }) =>
        h("div", { class: "dialog" }, [
          h("pre", { class: "question" }, [
            ...markup(state, question.value),
            question_notes.length > 0 ? h("hr", {}) : null,
            ...question_notes.map((note) => noteView(state, note)),
          ]),
          h("pre", { class: "index" }, text(index + 1)),
          h("pre", { class: "answer" }, [
            ...markup(state, answer.value),
            answer_notes.length > 0 ? h("hr", {}) : null,
            ...answer_notes.map((note) => noteView(state, note)),
          ]),
        ]),
    ],
    [
      p("card", [p("title", v("title")), v("content")]),
      ({ vars: { title, content } }) =>
        h("div", { class: "card" }, [
          h("h3", { class: "card-title" }, text(title.value)),
          h("pre", {}, text(content.value)),
        ]),
    ],
    ["default", null],
  ])

const noteView = (state, data) =>
  li.match(data, [
    [
      p("note", [v("content")]),
      ({ vars: { content } }) =>
        h("pre", { class: "note" }, [
          text(" "),
          h("span", { class: "note-name" }, text(data.attributes.name)),
          text(" "),
          text(content.value),
        ]),
    ],
  ])

// const Error

const container = (state, contents) =>
  h("div", { class: "container" }, contents)

// -- RUN --

const hub = () => {
  const url = new URL(document.location)
  return url.searchParams.get("hub")
}

app({
  init: [
    { book: null },
    [fetchJSONData, { url: `${hub()}/book`, onresponse: GotBook }],
  ],

  node: document.getElementById("app"),

  view: (state) =>
    state.book
      ? container(state, [
          frontCover(state, state.book),
          chapterList(state, state.book),
        ])
      : container(state, []),
})
