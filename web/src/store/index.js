import li from "little"
import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

const patterns = {
  book: li.Pattern.Element(
    "book",
    {},
    [
      li.Pattern.Element("title", {}, [li.Pattern.Var("title")]),
      li.Pattern.Var("preface"),
    ],
    "chapters"
  ),
  chapter: li.Pattern.Element(
    "chapter",
    {},
    [li.Pattern.Element("title", {}, [li.Pattern.Var("title")])],
    "contents"
  ),
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
  mutations,
  actions,
})

export default store
