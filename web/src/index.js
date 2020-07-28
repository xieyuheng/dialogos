import { h, text, app } from "hyperapp"
import li from "little"
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
    {},
    text(li.Pattern.match(patterns.book, state.book).vars["title"].text)
  )
}

function matchFrame(content) {
  const frame = li.p("frame", {}, [
    li.p("question", {}, [], { tail: "question" }),
    li.p("answer", {}, [], { tail: "answer" }),
  ])
  const result = li.Pattern.match(frame, content)
  if (result) {
    return result
  }
}

function matchCard(content) {
  const card = li.p("card", {}, [
    li.p("title", {}, li.v("title")),
    li.v("text"),
  ])
  const result = li.Pattern.match(card, content)
  if (result) {
    return result
  }
}

function randerSide(side) {
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
    const frame = matchFrame(content)
    return h("div", { class: "frame" }, [
      h("pre", { class: "question" }, text(randerSide(frame.tails.question))),
      h("pre", { class: "answer" }, text(randerSide(frame.tails.answer))),
    ])
  } else if (content.tag === "card") {
    const card = matchCard(content)
    return h("div", { class: "card" }, [
      h("h3", { class: "title" }, text(card.vars.title.text)),
      h("pre", {}, text(card.vars.text.text)),
    ])
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
