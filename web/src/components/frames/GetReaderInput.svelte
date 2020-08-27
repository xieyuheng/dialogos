<script context="module">
  export const tag = "GetReaderInput"
</script>

<script>
  import Frame from "../Frame.svelte"

  export let data

  const { input_parser, prompt_contents } = data

  import { contents, mini_message, mode, mode_stack, env } from "../../stores"
  import { reader_input_mode } from "../../modes"

  $contents = [...$contents, ...prompt_contents]
  $mode_stack = [...$mode_stack, $mode]
  $mode = reader_input_mode
  $env.data_stack.push(input_parser || "raw_input")
  $mini_message = `Entering ${reader_input_mode.name}.`
</script>
