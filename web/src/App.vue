<template>
  <div>
    <h1>{{ title() }}</h1>
    <div v-for="chapter of chapters()">
      <pre v-for="content of contents(chapter)">{{ content }}</pre>
    </div>
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
      if (this.book === null) return null
      // `<book>
      //    <title>$title</title>
      //    $preface
      //    ...$tail
      //  </book>`
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
      return result?.vars["title"].text
    },
    chapters() {
      if (this.book === null) return []

      const result = li.Pattern.match(
        li.Pattern.Element(
          "book",
          {},
          [
            li.Pattern.Element("title", {}, [li.Pattern.Var("title")]),
            li.Pattern.Var("preface"),
          ],
          "chapters"
        ),
        this.book
      )
      return result?.tails["chapters"]
    },
    contents(chapter) {
      const result = li.Pattern.match(
        li.Pattern.Element("chapter", {}, [
          li.Pattern.Element("title", {}, [li.Pattern.Var("title")]),
        ], "contents"),
        chapter
      )
      return result?.tails["contents"]
    },
  },
}
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
}
</style>
