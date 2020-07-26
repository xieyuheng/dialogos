<template>
  <div>
    <h1>{{ title() }}</h1>
  </div>
</template>

<script>
import li from "little"
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
  methods: {
    title() {
      if (this.book === null) {
        return null
      } else {
        const result = li.Pattern.match(
          li.Pattern.Element(
            "book",
            {},
            [
              li.Pattern.Element("title", {}, [li.Pattern.Var("title")]),
              li.Pattern.Var("preface"),
            ],
            "_"
          ),
          this.book
        )
        const title = result?.vars["title"].text
        return title
      }
    },
  },
}
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
}
</style>
