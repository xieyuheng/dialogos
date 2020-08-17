<script>
  import li, { p, v, lv } from "@the-little-books/little"
  import Note from "./Note.svelte"

  export let node
  export let index

  $: result = li.match(
    p("dialog", [
      p("teacher", [v("teacher"), lv("teacher_notes")]),
      p("student", [v("student"), lv("student_notes")]),
    ]),
    node
  )

  $: teacher = result.teacher.value
  $: student = result.student.value
  $: teacher_notes = result.teacher_notes
  $: student_notes = result.student_notes

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
    {#if teacher_notes.length > 0}
      <hr />
      {#each teacher_notes as note}
        <Note node="{note}" />
      {/each}
    {/if}
  </div>
  <div class="index">{index + 1}</div>
  <div class="student">
    <pre>
      {@html markup(student).join('')}
    </pre>
    {#if student_notes.length > 0}
      <hr />
      {#each student_notes as note}
        <Note node="{note}" />
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
