- handle the error when fail to fetch book from `hub`.
- show usage when no `hub` in `searchParams`.
- preview in time.
- `Contents`
- `Preface`
- indented text in dialog code block.
- frame one by one.
- show question, then answer.
- remember reader's progress.
- let reader answer first, then show the answer.
- let reader make comments, and export new commented books.
- finish chapter 1
- 用 cypress 做测试

# xml & 组建池 & semantic web

- 为了提高生产效率，我们需要的是一个以 xml 为 input 的组建池。
- part: xml -> view
- 组建池的概念是独立的，比如它也可以以 json 为 input。
- 对 xml 的处理也是独立的，比如可以用 pattern matching，xpath 或 css。
- 这样我们就能有 semantic web，因为我们可以自定义 tag。
  并且 content 与 view 是 完全分离的。

# 教学法调查报告。

- 考虑 little book 与所实现的语言之间的关系，
  little book 好像在于给每部分实现代码写测试用例。
  - 并且用到了某个解释范式。

# The Little Books webapp 功能

- 默认不显示回答，可以填写用户自己对问题的回答，并且做记录。
- 涂抹果酱的地方给一个 canvas 画板。
- 适配手机屏幕。
- 可以生成解释程序运行的对话（程序，参数 -- 对话）。
