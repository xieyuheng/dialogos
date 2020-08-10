// server.js
const { createServer } = require("http");
const app = require("./dist/index.bundle.js");

createServer((req, res) => {
  const { html } = app.render({ url: req.url });

  res.write(`
    <!DOCTYPE html>
    <div id="app">${html}</div>
    <script src="/dist/index.bundle.js"></script>
  `);

  res.end();
}).listen(3000);
