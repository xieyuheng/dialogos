<template>
  <div>
    <Content
      v-for="(content, index) of contents(chapter)"
      v-bind:key="index"
      v-bind:chapter_index="chapter_index"
      v-bind:content_index="index"
    />
  </div>
</template>

<script>
import Vuex from "vuex"
import store from "../store"
import Content from "./Content"

export default {
  name: "Chapter",
  props: {
    chapter_index: Number,
  },
  computed: {
    chapter() {
      return store.getters.chapters[this.chapter_index]
    },
    ...Vuex.mapGetters(["contents"]),
  },
  components: {
    Content,
  },
}
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
}
</style>
