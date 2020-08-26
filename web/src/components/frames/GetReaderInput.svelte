<script context="module">
  export const tag = "GetReaderInput"
</script>

<script>
  import Frame from "../Frame.svelte"

  export let data

  import { contents, mini_message, mode, mode_stack } from "../../stores"
  import { reader_input_mode } from "../../modes"

  $contents = [...$contents, ...data]
  $mode_stack = [...$mode_stack, $mode]
  $mode = reader_input_mode
  $mini_message = `Entering ${reader_input_mode.name}.`
</script>
