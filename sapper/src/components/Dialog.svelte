<script>
  import li, { p, v } from "@the-little-books/little"
  import Note from "./Note.svelte"

  export let data
  export let index

  $: result = li.match(
    p("dialog", [
      p("teacher", [v("teacher")], { tail: "teacher_notes" }),
      p("student", [v("student")], { tail: "student_notes" }),
    ]),
    data
  )

  $: teacher = result && result.vars.teacher.value
  $: student = result && result.vars.student.value
  $: teacher_notes = result && result.tails.teacher_notes
  $: student_notes = result && result.tails.student_notes

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

{#if result}
  <div class="dialog">
    <div class="teacher">
      <pre>
        {@html markup(teacher).join('')}
      </pre>
      {#if teacher_notes.length > 0}
        <hr />
        {#each teacher_notes as note}
          <Note data="{note}" />
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
          <Note data="{note}" />
        {/each}
      {/if}
    </div>
  </div>
{/if}

<style>
  @import "./base.css";

  .dialog {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .dialog .teacher {
    flex: 50%;
    padding: 1em;
  }

  .dialog .index {
    font-size: 8px;
    flex: 4%;
    padding: 1em;
  }

  .dialog .student {
    flex: 50%;
    padding: 1em;
  }

  .dialog hr {
    margin-top: 4px;
    margin-bottom: 4px;
  }
</style>
