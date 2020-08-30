- config web host and port in server.
- fix cors.
- different build for different config.
- benchmark different book servers.
  - make it easy for different implementations to co-exist.
  - servers:
    - fs cache
    - fs no cache
    - pg
- scripts/database -- pg docker.
  - save books in pg as json.
- reader login.
- session to record reading progress.
- restore reader progress.
- code block -- cicada/lang2.
- screen-mode.
- local variable in `ReturnEntry`.
- ws and filewatcher.
- 实现 translate 机制 -- 以方便用中文。
  - for chinese field names.
  - also for chinese tags.
- let reader answer first, then show the answer.
# menu
- left `status` button -- click for menu.
# design
- wireframe.
- sitemap.
- css for Comment, ReaderComment, ReaderInput.
- css for Loading.
- ReaderComment datetime.
- ReaderInput datetime.
- be able to use big <textarea> sometimes.
  - we need a **simple** solution.
- report on im products.
# test
- use cypress to test control flow.
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
# export
- right `export` button.
- export new commented books.
- 提供机制使得 reader 可以在学习过程中主动记笔记，
  我们可以收集这些笔记，用认知心理学的方法，来研究 reader 的认知过程。
- reader 可以选择分享自己的笔记给后来学习的人。
  让后来学习的人在学习的过程中看到自己的笔记。
  - 类似黑暗之魂。
  - 一个运营周期内的同学，也许可以互相分享笔记。
  - 助教可以以笔记的方式留下学习寄语。
