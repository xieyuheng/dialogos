<template>
  <div>
    <hr />
    <pre>{{ content }}</pre>
  </div>
</template>

<script>
import li from "little"
import Vuex from "vuex"
import store from "../store"

export default {
  name: "Content",
  props: {
    chapter_index: Number,
    content_index: Number,
  },
  computed: {
    chapter() {
      return store.getters.chapters[this.chapter_index]
    },
    content() {
      const content = store.getters.contents(this.chapter)[this.content_index]

      {
        const frame = li.Pattern.Element("frame", {}, [
          li.Pattern.Element("question", {}, [], "question_body"),
          li.Pattern.Element("answer", {}, [], "answer_body"),
        ])
        const result = li.Pattern.match(frame, content)
        if (result) {
          return result
        }
      }

      {
        const card = li.Pattern.Element("card", {}, [
          li.Pattern.Element("title", {}, [li.Pattern.Var("title")]),
          li.Pattern.Var("text")
        ])
        const result = li.Pattern.match(card, content)
        if (result) {
          return result
        }
      }

      return undefined
    },
    ...Vuex.mapGetters(["contents"]),
      },
    }
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
}
</style>
