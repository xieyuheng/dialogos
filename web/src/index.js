import { html, render } from "lit-html"
import li from "@the-little-books/little"
import "./index.css"

const hi = (name) => html`<p>Hi ${name}</p>`

render(hi("World"), document.getElementById("app"))
