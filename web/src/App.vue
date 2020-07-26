<template>
  <div>
    <h1>The Little Books</h1>
    <br />
    <pre>{{ title }}</pre>
  </div>
</template>

<script>
import little from "little"
const hub = "http://localhost:3000/api"

export default {
  name: "App",
  data() {
    return {
      book: null,
    }
  },
  mounted() {
    fetch(`${hub}/book`)
      .then((response) => response.json())
      .then((data) => {
        this.book = data
      })
  },
  computed: {
    title() {
      return little.Pattern.match(little.Pattern.Var("x"), this.book)
    },
  },
}
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
}
</style>
