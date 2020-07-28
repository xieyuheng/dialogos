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

const patterns = {
  book: p("book", {}, [p("title", {}, v("title")), v("preface")], {
    tail: "chapters",
  }),
  chapter: p("chapter", {}, p("title", {}, v("title")), {
    tail: "contents",
  }),
}

const titleView = (state) => {
  if (state.book === null) return null

  const title = li.Pattern.match(
    p("book", {}, [p("title", {}, v("title"))], { tail: "_" }),
    state.book
  ).vars["title"].text

  return h("h1", {}, text(title))
}

const contentView = (state, content, index) => {
  if (state.book === null) return null

  if (content.tag === "frame") {
    const frame = li.Pattern.match(
      p("frame", {}, [
        p("question", {}, [v("question")], { tail: "question_notes" }),
        p("answer", {}, [v("answer")], { tail: "answer_notes" }),
      ]),
      content
    )
    return h("div", { class: "frame" }, [
      h("pre", { class: "question" }, text(frame.vars.question.text)),
      h("pre", { class: "answer" }, text(frame.vars.answer.text)),
    ])
  } else if (content.tag === "card") {
    const card = li.Pattern.match(
      p("card", {}, [p("title", {}, v("title")), v("text")]),
      content
    )
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

  const contents = li.Pattern.match(patterns.chapter, chapter).tails.contents

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

  const chapters = li.Pattern.match(patterns.book, state.book).tails.chapters

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
    [fetchJSONData, { url: `${hub}/book`, onresponse: GotBook }],
  ],

  node: document.getElementById("app"),

  view: (state) => container([titleView(state), chapterList(state)]),
})
