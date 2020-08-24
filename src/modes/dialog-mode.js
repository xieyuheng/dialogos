<script>
  export const name = "dialog-mode"

  // export next = async () => {
  //   const next_dialog = async () => {
  //     $contents = [...$contents, { Loading: "Loading next statement... ⏳" }]
  //     // TODO fix this use of stmts like GET_READER_INPUT in book.
  //     const content = await vm.Env.next(env)
  //     $contents.pop()

  //     let prompt_contents = vm.Env.match_stmt_name(content, "GET_READER_INPUT")
  //     if (prompt_contents) {
  //       $contents = [...$contents, ...prompt_contents]
  //       mode = "reader_input_mode"
  //       $mini_message = "Entering reader_input_mode."
  //       return
  //     }

  //     $contents = [...$contents, content]
  //     $mini_message = ""
  //   }
  // }
</script>
