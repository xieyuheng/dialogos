<script context="module">
  export const tag = "dialog"
</script>

<script>
  import Note from "./Note.svelte"

  export let data
  export let index

  const { teacher, student, teacher_notes, student_notes } = data

  const get_notes = (obj) => {
    if (obj) {
      const notes = Array.from(Object.entries(obj)).map(([name, content]) => ({
        name,
        content,
      }))
      if (notes.length === 0) {
        return null
      } else {
        return notes
      }
    } else {
      return null
    }
  }

  const teacher_note_array = get_notes(teacher_notes)
  const student_note_array = get_notes(student_notes)

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

<div class="dialog">
  <div class="teacher">
    <pre>
      {@html markup(teacher).join('')}
    </pre>
    {#if teacher_note_array}
      <hr />
      {#each teacher_note_array as note}
        <Note {...note} />
      {/each}
    {/if}
  </div>
  <div class="index">{index + 1}</div>
  <div class="student">
    <pre>
      {@html markup(student).join('')}
    </pre>
    {#if student_note_array}
      <hr />
      {#each student_note_array as note}
        <Note {...note} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .dialog {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .dialog .teacher,
  .dialog .student {
    flex: 50%;
    padding: 1em;
  }

  .dialog .index {
    font-size: 8px;
    flex: 4%;
    padding: 1em;
  }

  .dialog hr {
    margin-top: 4px;
    margin-bottom: 4px;
  }

  @media (max-width: 500px) {
    .dialog {
      flex-direction: column;
    }

    .dialog .teacher {
      border-bottom: thin dashed;
    }

    .dialog .student {
      padding-left: 4em;
      padding-top: 0;
      margin-top: -0.5em;
    }

    .dialog .index {
      padding-bottom: 0em;
    }
  }
</style>
