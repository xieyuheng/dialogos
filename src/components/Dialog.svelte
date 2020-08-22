<script context="module">
  export const matcher = (data) => data["dialog"]
</script>

<script>
  import Note from "./Note.svelte"

  export let data
  export let index

  $: result = matcher(data)

  $: teacher = result.teacher
  $: student = result.student
  $: teacher_notes =
    result.teacher_notes &&
    Array.from(Object.entries(result.teacher_notes)).map(([name, content]) => ({
      name,
      content,
    }))
  $: student_notes =
    result.student_notes &&
    Array.from(Object.entries(result.student_notes)).map(([name, content]) => ({
      name,
      content,
    }))

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
    {#if teacher_notes && teacher_notes.length > 0}
      <hr />
      {#each teacher_notes as note}
        <Note {...note} />
      {/each}
    {/if}
  </div>
  <div class="index">{index + 1}</div>
  <div class="student">
    <pre>
      {@html markup(student).join('')}
    </pre>
    {#if student_notes && student_notes.length > 0}
      <hr />
      {#each student_notes as note}
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
