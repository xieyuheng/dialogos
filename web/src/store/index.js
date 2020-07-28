import li from "little"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const patterns = {
  book: li.p("book", {}, [li.p("title", {}, li.v("title")), li.v("preface")], {
    tail: "chapters",
  }),
  chapter: li.p("chapter", {}, li.p("title", {}, li.v("title")), {
    tail: "contents",
  }),
}

const store = new Vuex.Store({
  state: {
    book: null,
  },
  getters: {
    title: (state) => {
      return (
        state.book &&
        li.Pattern.match(patterns.book, state.book).vars["title"].text
      )
    },
    chapters: (state) => {
      return (
        state.book &&
        li.Pattern.match(patterns.book, state.book).tails["chapters"]
      )
    },
    contents: (state) => (chapter) => {
      return (
        state.book &&
        li.Pattern.match(patterns.chapter, chapter).tails["contents"]
      )
    },
  },
  mutations: {
    set_book: (state, payload) => {
      state.book = payload.book
    },
  },
})

export default store
