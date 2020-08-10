import { html, render } from "lit-html"
import "./index.css"

const hi = (name) => html`<p>Hi ${name}</p>`

render(hi("World"), document.getElementById("app"))
