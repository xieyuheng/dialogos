- <date> in <info>

- `opts: { end: boolean }` for `match`

  - to avoid unnecessary `{ tail: ... }`

- frame one by one.
- show question, then answer.
- `Contents`
- `Preface`
- 实时预览所生成的页面
- take hub url from query string -- ?hub=http://localhost:3000/api/book
- finish chapter 1
- 用 cypress 做测试

# question

- vue `computed` vs `methods`?
  - why I need to use `methods` when matching.

# info

- test:
  http://localhost:8080
  http://localhost:3000/api/book

# template

frame:

<frame>
<question>

</question>
<answer>

</answer>
</frame>

# 教学法调查报告。

- 考虑 little book 与所实现的语言之间的关系，
  little book 好像在于给每部分实现代码写测试用例。
  - 并且用到了某个解释范式。

# The Little Books webapp 功能

- 默认不显示回答，可以填写用户自己对问题的回答，并且做记录。
- 涂抹果酱的地方给一个 canvas 画板。
- 适配手机屏幕。
- 可以生成解释程序运行的对话（程序，参数 -- 对话）。
