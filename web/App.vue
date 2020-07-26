<template>
  <div>
    <h1>The Little Books</h1>
    <br><pre>{{ book }}</pre>
  </div>
</template>

<script>
const hub = "http://localhost:3000/api"

export default {
  data() {
    return {
      book: null,
    }
  },
  mounted() {
    fetch(`${hub}/book`)
      .then((response) => response.json())
      .then((data) => {
        this.book = JSON.stringify(data, null, 2)
      })
  },
  methods: {
    reversed_message() {
      return this.message.split("").reverse().join("")
    },
  },
}
</script>

<style scoped>
* {
  font-family: "Noto Mono", monospace;
}
</style>
