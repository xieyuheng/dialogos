<template>
  <div>
    <h1>The Little Books</h1>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversed_message() }}"</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "1234567",
    }
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
