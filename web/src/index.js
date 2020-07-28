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
    tail: "frames",
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

const frameView = (state, frame, index) => {
  if (state.book === null) return null

  // Pattern.match(frame, [
  //   [
  //     p("dialog", {}, [
  //       p("question", {}, [v("question")], { tail: "question_notes" }),
  //       p("answer", {}, [v("answer")], { tail: "answer_notes" }),
  //     ]),
  //     ({ vars: { question, answer } }) =>
  //       h("div", { class: "dialog" }, [
  //         h("pre", { class: "question" }, text(question.text)),
  //         h("pre", { class: "answer" }, text(answer.text)),
  //       ]),
  //   ],
  //   [
  //     p("card", {}, [p("title", {}, v("title")), v("text")]),
  //     ({ vars: { title, text } }) =>
  //       h("div", { class: "card" }, [
  //         h("h3", { class: "title" }, text(card.vars.title.text)),
  //         h("pre", {}, text(card.vars.text.text)),
  //       ]),
  //   ],
  // ])

  if (frame.tag === "dialog") {
    const dialog = li.Pattern.match(
      p("dialog", {}, [
        p("question", {}, [v("question")], { tail: "question_notes" }),
        p("answer", {}, [v("answer")], { tail: "answer_notes" }),
      ]),
      frame
    )
    return h("div", { class: "dialog" }, [
      h("pre", { class: "question" }, text(dialog.vars.question.text)),
      h("pre", { class: "answer" }, text(dialog.vars.answer.text)),
    ])
  } else if (frame.tag === "card") {
    const card = li.Pattern.match(
      p("card", {}, [p("title", {}, v("title")), v("content")]),
      frame
    )
    return h("div", { class: "card" }, [
      h("h3", { class: "title" }, text(card.vars.title.text)),
      h("pre", {}, text(card.vars.content.text)),
    ])
  } else {
    return null
  }
}

const chapterView = (state, chapter, index) => {
  if (state.book === null) return null

  const frames = li.Pattern.match(patterns.chapter, chapter).tails.frames

  return h(
    "div",
    { class: "chapter" },
    h(
      "div",
      { class: "frames" },
      frames.map((frame, index) => frameView(state, frame, index))
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
