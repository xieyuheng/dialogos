import { h, text, app } from "hyperapp"
import li from "little"

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

const patterns = {
  book: li.p("book", {}, [li.p("title", {}, li.v("title")), li.v("preface")], {
    tail: "chapters",
  }),
  chapter: li.p("chapter", {}, li.p("title", {}, li.v("title")), {
    tail: "contents",
  }),
}

const titleView = (state) => {
  if (state.book === null) return null

  return h(
    "h1",
    {
      style: {
        "font-family": '"Noto Mono", monospace',
        "text-align": "center",
      },
    },
    text(li.Pattern.match(patterns.book, state.book).vars["title"].text)
  )
}

function match_frame(content) {
  const frame = li.p("frame", {}, [
    li.p("question", {}, [], { tail: "question" }),
    li.p("answer", {}, [], { tail: "answer" }),
  ])
  const result = li.Pattern.match(frame, content)
  if (result) {
    return result
  }
}

function match_card(content) {
  const card = li.p("card", {}, [
    li.p("title", {}, li.v("title")),
    li.v("text"),
  ])
  const result = li.Pattern.match(card, content)
  if (result) {
    return result
  }
}

function rander_side(side) {
  let s = ""
  for (const node of side) {
    if (node.kind === "Node.Text") {
      s += node.text
    }
  }
  return s
}

const contentView = (state, content, index) => {
  if (state.book === null) return null

  if (content.tag === "frame") {
    const frame = match_frame(content)
    return h(
      "div",
      {
        class: "frame",
        style: {
          display: "flex",
          "border-top": "1px solid #666666",
          "border-bottom": "1px solid #666666",
        },
      },
      [
        h(
          "pre",
          {
            class: "question",
            style: {
              flex: "50%",
              "margin-left": "1em",
              "margin-right": "2em",
            },
          },
          text(rander_side(frame.tails.question))
        ),
        h(
          "pre",
          {
            class: "answer",
            style: {
              flex: "50%",
              "margin-left": "1em",
              "margin-right": "2em",
            },
          },
          text(rander_side(frame.tails.answer))
        ),
      ]
    )
  } else if (content.tag === "card") {
    const card = match_card(content)
    return h(
      "div",
      {
        class: "card",
        style: {
          "text-align": "center",
          "margin-left": "4em",
          "margin-right": "4em",

          "margin-top": "2em",
          "margin-bottom": "2em",

          padding: "1em",

          "border-style": "double",
        },
      },
      [
        h("h3", { class: "title" }, text(card.vars.title.text)),
        h(
          "pre",
          {
            style: {
              "white-space": "pre-wrap",
            },
          },
          text(card.vars.text.text)
        ),
      ]
    )
  } else {
    return null
  }
}

const chapterView = (state, chapter, index) => {
  if (state.book === null) return null

  const contents = li.Pattern.match(patterns.chapter, chapter).tails["contents"]

  return h(
    "div",
    { class: "chapter" },
    h(
      "div",
      { class: "contents" },
      contents.map((content, index) => contentView(state, content, index))
    )
  )
}

const chapterList = (state) => {
  if (state.book === null) return null

  const chapters = li.Pattern.match(patterns.book, state.book).tails["chapters"]

  return h(
    "div",
    { class: "chapters" },
    chapters.map((chapter, index) => chapterView(state, chapter, index))
  )
}

const container = (content) => h("div", { class: "container" }, content)

// -- RUN --

const hub = "http://localhost:3000/api"

app({
  init: [
    { book: null },
    [
      fetchJSONData,
      {
        url: `${hub}/book`,
        onresponse: GotBook,
      },
    ],
  ],

  node: document.getElementById("app"),

  view: (state) => container([titleView(state), chapterList(state)]),
})
