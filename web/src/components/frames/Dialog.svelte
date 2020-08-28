<script context="module">
  export const tag = "Dialog"
</script>

<script>
  import { get } from "svelte/store"
  import vm from "@dialogos/vm"
  import { mini_message, mode, mode_stack } from "../../stores"
  import { fundamental_mode, reader_comment_mode } from "../../modes"
  import Note from "./Dialog/Note.svelte"

  export let data
  export let index

  const { teacher, student, teacher_notes, student_notes } = data

  let hide_student = true

  $mode_stack.push($mode)
  $mini_message = `Teacher asks.`
  $mode = teacher_ask_mode

  function teacher_ask_mode(stores) {
    const { mini_message, mode, mode_stack } = stores

    return {
      name: "teacher-ask-mode",

      async ok() {
        mode.set(get(mode_stack).pop())
        mini_message.set(`Student answers.`)
        hide_student = false
      },

      ok_icon: {
        src: "cute-circled-chevron-down-64px.png",
        alt: "next",
      },

      status_icon: {
        src: "cute-dialog-64px.png",
        alt: "dialog",
      },

      input_buffer_focus() {
        get(mode_stack).push(get(mode))
        mini_message.set(
          `Entering reader_comment_mode from ${get(mode)(stores).name}.`
        )
        mode.set(reader_comment_mode)
      },
    }
  }

  const get_notes = (obj) => {
    const notes = []
    for (const name in obj) notes.push({ name, content: obj[name] })
    return notes
  }

  const teacher_note_array = teacher_notes ? get_notes(teacher_notes) : []
  const student_note_array = student_notes ? get_notes(student_notes) : []

  const markup = (str) => {
    const result = str.match(/^(.*?)\^\[(.*?)\](.*)/msu)
    if (result !== null) {
      const [_target, prev, name, rest] = result
      return [prev, `<span class="note-name">${name}</span>`, ...markup(rest)]
    } else {
      return [str]
    }
  }
</script>

<div class="frame">
  <div class="dialog">
    <div class="teacher">
      <pre>
        {@html markup(teacher).join('')}
      </pre>
      {#if teacher_note_array.length !== 0}
        <hr />
        {#each teacher_note_array as note}
          <Note {...note} />
        {/each}
      {/if}
    </div>
    <div class="index">{index + 1}</div>
    <div class="student" class:hide_student>
      <pre>
        {@html markup(student).join('')}
      </pre>
      {#if student_note_array.length !== 0}
        <hr />
        {#each student_note_array as note}
          <Note {...note} />
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .frame {
    border-top: thin solid;
    border-bottom: thin solid;
  }

  .dialog {
    display: grid;
    grid-template-columns: 12fr 1fr 12fr;
  }

  .dialog .teacher,
  .dialog .student {
    padding: 1em;
  }

  .dialog .index {
    font-size: 8px;
    padding: 1em;
  }

  .hide_student {
    display: none;
  }

  .dialog hr {
    margin-top: 4px;
    margin-bottom: 4px;
  }

  @media (max-width: 500px) {
    .dialog {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 1fr 12fr;
    }

    .dialog .teacher {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 3;
      border-bottom: thin solid #8d6c9f;
    }

    .dialog .student {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: 3;
    }

    .dialog .index {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 2;
      padding-bottom: 0em;
    }
  }
</style>
