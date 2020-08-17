- screen-mode
- be able to use big <textarea> sometimes.
  - we need a **simple** solution.
- use `result` to subst pattern variables in body.
- local variable in `ReturnEntry`.
- ws and filewatcher.
- per frame schema.
# design
- css for Comment frame
- css for ReaderComment frame
- css for ReaderInput frame
# report on im products
# little
- hand written xml lexer.
  - build xml Node from token by a stack machine.
# test
- use cypress to test control flow.
# error handling
- handle frame parsing error in a general way.
- [maybe] handle `Env.next` error.
# layout
- `Nav` for navigation -- table of contents, jump to chapters.
# content
- finish chapter 1
# 教学法调查报告。
- 考虑 little book 与所实现的语言之间的关系，
  little book 好像在于给每部分实现代码写测试用例。
  - 并且用到了某个解释范式。
# dialog & im-app ux
- make the dialog looks like im apps.
# canvas
- 涂抹果酱的地方给一个 canvas 画板。
# dialog gen
- 可以生成解释程序运行的对话（程序，参数 -- 对话）。
# for reader
- reader login.
- session to record reading progress.
- let reader answer first, then show the answer.
# menu
- left `status` button -- click for menu.
# export
- right `export` button.
- export new commented books.
# deploy
- fix heroku file.
