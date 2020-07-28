<template>
  <div>
    <div v-if="content.tag === 'frame'" class="frame">
      <pre class="question">{{
        rander_side(match_frame(content).tails.question)
      }}</pre>
      <pre class="answer">{{
        rander_side(match_frame(content).tails.answer)
      }}</pre>
    </div>
    <div v-else-if="content.tag === 'card'" class="card">
      <h3 class="title">{{ match_card(content).vars.title.text }}</h3>
      <pre>{{ match_card(content).vars.text.text }}</pre>
    </div>
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
      const frame = li.p("frame", {}, [
        li.p("question", {}, [], { tail: "question" }),
        li.p("answer", {}, [], { tail: "answer" }),
      ])
      const result = li.Pattern.match(frame, content)
      if (result) {
        return result
      }
    },

    match_card(content) {
      const card = li.p("card", {}, [
        li.p("title", {}, li.v("title")),
        li.v("text"),
      ])
      const result = li.Pattern.match(card, content)
      if (result) {
        return result
      }
    },

    rander_side(side) {
      let s = ""
      for (const node of side) {
        if (node.kind === "Node.Text") {
          s += node.text
        }
      }
      return s
    },
  },
}
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
  line-height: 1.5;
}

.frame {
  display: flex;
  border-top: 1px solid #666666;
  border-bottom: 1px solid #666666;
}

.question {
  flex: 50%;
  margin-left: 1em;
  margin-right: 2em;
}

.answer {
  flex: 50%;
  margin-left: 1em;
  margin-right: 2em;
}

.card {
  text-align: center;
  margin-left: 4em;
  margin-right: 4em;

  margin-top: 2em;
  margin-bottom: 2em;

  padding: 1em;

  border-style: double;
}

pre {
  white-space: pre-wrap;
}
</style>
