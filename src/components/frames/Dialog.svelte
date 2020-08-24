<script context="module">
  export const tag = "Dialog"
</script>

<script>
  import Note from "./Dialog/Note.svelte"

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

<div class="frame">
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
