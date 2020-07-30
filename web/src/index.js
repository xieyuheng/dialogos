import { h, text, app } from "hyperapp"
import li, { p, v } from "little"
import "./index.css"

// -- EFFECTS & SUBSCRIPTIONS --

const connectHub = (dispatch, { onhub }) => {
  const url = new URL(document.location)
  const hub = url.searchParams.get("hub")

  if (hub) {
    dispatch(onhub, hub)
  }
}

const fetchJSONData = (dispatch, { url, onresponse, onerror }) =>
  fetch(url)
    .then((response) =>
      response.status === 200
        ? response.json()
        : dispatch(onerror, {
            message: "fail to fetch url",
            url,
            response: {
              status: response.status,
              statusText: response.statusText,
            },
          })
    )
    .then((data) => dispatch(onresponse, data))
    .catch((error) => dispatch(onerror, error))

// -- ACTIONS --

const SetBook = (state, book) => ({ ...state, book })
const SetError = (state, error) => ({ ...state, error })
const SetHub = (state, hub) => [
  { ...state, hub },
  [
    fetchJSONData,
    {
      url: `${hub}/book`,
      onresponse: SetBook,
      onerror: SetError,
    },
  ],
]

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
      ({ vars: { title }, tails: { frames } }) =>
        h("div", { class: "chapter" }, [
          h("h3", { class: "chapter-title" }, text(title.value)),
          h(
            "div",
            { class: "frames" },
            frames.map((frame, index) => frameView(state, frame, index))
          ),
        ]),
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

const errorView = (state, error) =>
  h("div", { class: "error" }, [
    text("An error occured:"),
    h("pre", {}, text(JSON.stringify(error, null, 2))),
  ])

const usageView = (state) => {
  const url = new URL(document.location)
  return h("div", { class: "usage" }, [
    text("To use The Litte Books, we need to provide a URL to book hub api."),
    h("br", {}),
    text("Like the following:"),
    h("pre", {}, text(`${url.origin}/?hub=<url-to-book-hub-api>`)),
  ])
}

const container = (state, contents) =>
  h("div", { class: "container" }, contents)

// -- RUN --

const init = app({
  init: [
    {
      book: null,
      error: null,
      hub: null,
    },
    [connectHub, { onhub: SetHub }],
  ],

  node: document.getElementById("app"),

  view: (state) =>
    state.book
      ? container(state, [
          frontCover(state, state.book),
          chapterList(state, state.book),
        ])
      : state.error
      ? container(state, [errorView(state, state.error)])
      : container(state, [usageView(state)]),
})
