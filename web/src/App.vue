<template>
  <div>
    <h1>{{ title }}</h1>
    <Chapter
      v-for="(chapter, index) of chapters"
      v-bind:key="index"
      v-bind:chapter_index="index" />
  </div>
</template>

<script>
import Vue from "vue"
import Vuex from "vuex"
import store from "./store"
import Chapter from "./components/Chapter"

const hub = "http://localhost:3000/api"

export default {
  name: "App",
  store,
  created() {
    fetch(`${hub}/book`)
      .then((response) => response.json())
      .then((book) => store.commit("set_book", { book }))
  },
  computed: {
    ...Vuex.mapGetters(["title", "chapters"]),
  },
  components: {
    Chapter,
  },
}
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
}

h1 {
  text-align: center;
}
</style>
