import { h, text, app } from "hyperapp"
import li, { p, v } from "@the-little-books/little"
import Cookies from "js-cookie"
import "./index.css"

// -- EFFECTS & SUBSCRIPTIONS --

const connectServer = (dispatch, { onserver }) => {
  const url = new URL(document.location)
  const server = url.searchParams.get("server")

  if (server) {
    dispatch(onserver, server)
  }
}

const watchFileChange = (dispatch, { host, port, onfilechange }) => {
  const ws = new WebSocket(`ws://${host}:${port}`)

  ws.onopen = (_event) => {
    ws.send("watch")
    ws.onmessage = (event) => {
      dispatch(onfilechange, event.data)
    }
  }

  return () => ws.close()
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

const scrollToBottom = (_dispatch) => {
  // NOTE need a delay here,
  //   because we can only scrollToBottom
  //   after the new node is rendered,
  //   and updating a node on the page need time.
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    })
  }, 100)
}

const keySub = (dispatch, { keys, action }) => {
  // Hook up dispatch to external events
  const handler = (event) => {
    if (keys.includes(event.key)) {
      dispatch(action, event.key)
    }
  }
  window.addEventListener("keydown", handler)

  return () => window.removeEventListener("keydown", handler)
}

const setCookie = (_dispatch, { key, value, opts }) => {
  console.log({ key, value, opts })
  Cookies.set(key, value, opts)
}

const resumeStudy = (dispatch) => {
  const chapter = Cookies.get("study.chapter")
  const frame = Cookies.get("study.frame")

  dispatch(SetStudy, {
    chapter: chapter ? Number(chapter) : 0,
    frame: frame ? Number(frame) : 0,
  })
}

// --ACTIONS--

const SetBook = (state, book) => ({ ...state, book })

const SetError = (state, error) => ({ ...state, error })

const SetServer = (state, server) => [
  { ...state, server },
  [
    fetchJSONData,
    {
      url: `${server}/`,
      onresponse: SetBook,
      onerror: SetError,
    },
  ],
  [
    fetchJSONData,
    {
      url: `${server}/filewatcher`,
      onresponse: StartFileWatcher,
      onerror: SetError,
    },
  ],
]

const StartFileWatcher = (state, { host, port }) => [
  state,
  [
    watchFileChange,
    {
      host,
      port,
      onfilechange: UpdateBook,
    },
  ],
]

const UpdateBook = (state) => [
  state,
  [
    fetchJSONData,
    {
      url: `${state.server}/`,
      onresponse: SetBook,
      onerror: SetError,
    },
  ],
]

const SetStudy = (state, study) => ({ ...state, study })

const NextFrame = (state) => [
  {
    ...state,
    study: {
      ...state.study,
      frame: state.study.frame + 1,
    },
  },
  [scrollToBottom],
  [
    setCookie,
    {
      key: "study.frame",
      value: state.study.frame + 1,
      opts: { expires: 365 },
    },
  ],
]

// -- VIEWS ---

const bookView = (state, data) =>
  li.match(data, [
    [
      p("book"),
      (_) => h("div", {}, [frontCover(state, data), chapterList(state, data)]),
    ],
    [
      p("parsererror", v("message")),
      ({ vars: { message } }) =>
        h("div", { class: "parsererror" }, [
          h("h3", {}, [text("XML parser error:")]),
          h("pre", {}, [text(message.value)]),
        ]),
    ],
  ])

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
          chapters.map((chapter, index) =>
            index <= state.study.chapter
              ? chapterView(state, chapter, index)
              : null
          )
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
            frames.map((frame, index) =>
              index <= state.study.frame ? frameView(state, frame, index) : null
            )
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
  h("div", { class: "frame" }, [
    frameContent(state, data, index),
    frameControl(state, data, index),
  ])

const frameContent = (state, data, index) =>
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
    ["default", null]
  ])

const frameControl = (state, data, index) =>
  h("div", { class: "frame-control" }, [
    index === state.study.frame
      ? h("button", { class: "next-frame", onclick: NextFrame }, text("NEXT"))
      : null,
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
    text("To use The Litte Books, we need to provide a URL to book server."),
    h("br", {}),
    h("br", {}),
    text("Like the following:"),
    h("pre", {}, text(`  ${url.origin}/?server=<url-to-book-server>`)),
    h("br", {}),
    text("It might take a few seconds to load the book."),
  ])
}

// -- RUN --

app({
  init: [
    {
      book: null,
      error: null,
      server: null,
      study: {
        chapter: 0,
        frame: 0,
      },
    },
    [connectServer, { onserver: SetServer }],
    [resumeStudy],
  ],

  node: document.getElementById("app"),

  view: (state) =>
    state.book
      ? bookView(state, state.book)
      : state.error
      ? errorView(state, state.error)
      : usageView(state),

  subscriptions: (state) => [
    [
      keySub,
      {
        keys: ["Enter"],
        action: NextFrame,
      },
    ],
  ],
})