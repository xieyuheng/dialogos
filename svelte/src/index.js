import App from "./App.svelte"
import "./index.css"

const app = new App({
  target: document.getElementById("app"),
  props: {
    title: "Report on The Little Typer",
  },
})

window.app = app

export default app
