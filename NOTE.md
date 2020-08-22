## Design

Unicode reference:
- https://en.wikipedia.org/wiki/Arrow_(symbol)
- https://en.wikipedia.org/wiki/Emoji
- https://en.wikipedia.org/wiki/Dingbat

Color:
- https://www.rapidtables.com/web/css/css-color.html

Icons:
- https://icons8.com/icons/dusk

## PWA

Manifest
- https://developer.mozilla.org/en-US/docs/Web/Manifest

## XML & components & semantic web

- 为了提高生产效率，我们需要的是一个以 xml 为 input 的组建池。
- part: xml -> view
- 组建池的概念是独立的，比如它也可以以 json 为 input。
- 对 xml 的处理也是独立的，比如可以用 pattern matching，xpath 或 css。
  - 在 xml -> view 这个过程中，可以有中间步骤，比如：
    - 利用 schema 中 translation 的唯一性，来把 xml 转化成 json，
      从而得到：xml -> json -> view 的数据流
    - 可以给 json 加 action，
      而得到：xml -> json -> json -> view 的数据流
- 这样我们就能有 semantic web，因为我们可以自定义 tag。
  并且 content 与 view 是 完全分离的。
