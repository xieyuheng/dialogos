<template>
  <div>
    <hr />
    <div v-if="content.tag === 'frame'"
         class="frame">
      <pre class="question">{{ match_question(content) }}</pre>
      <pre class="answer">{{ match_answer(content) }}</pre>
    </div>
    <pre v-else-if="content.tag === 'card'">{{ match_card(content) }}</pre>
    <pre v-else>{{ content }}</pre>
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
      return store.getters.contents(this.chapter)[this.content_index]
    },
    ...Vuex.mapGetters(["contents"]),
  },

  methods: {
    match_frame(content) {
      const frame = li.Pattern.Element("frame", {}, [
        li.Pattern.Element("question", {}, [], "question_body"),
        li.Pattern.Element("answer", {}, [], "answer_body"),
      ])
      const result = li.Pattern.match(frame, content)
      if (result) {
        return result
      }
    },

    match_question(content) {
      return this.match_frame(content).tails.question_body
    },

    match_answer(content) {
      return this.match_frame(content).tails.answer_body
    },

    match_card(content) {
      const card = li.Pattern.Element("card", {}, [
        li.Pattern.Element("title", {}, [li.Pattern.Var("title")]),
        li.Pattern.Var("text"),
      ])
      const result = li.Pattern.match(card, content)
      if (result) {
        return result
      }
    },
  },
}
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
}

.frame {
  display: flex;
}

.question {
  flex: 50%;
}

.answer {
  flex: 50%;
}

pre {
  white-space: pre-wrap;
}
</style>
