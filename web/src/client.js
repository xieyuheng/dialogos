import * as sapper from "@sapper/app"

window.sapper = sapper

sapper.start({
  target: document.querySelector("#sapper"),
})
