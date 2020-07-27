<template>
  <div>
    <hr/>
    <pre v-for="(content, index) of contents(chapter)">{{ content }}</pre>
  </div>
</template>

<script>
import Vuex from "vuex"
import store from "../store"

export default {
  name: "Chapter",
  props: {
    index: Number,
  },
  computed: {
    chapter() {
      return store.getters.chapters[this.index]
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
