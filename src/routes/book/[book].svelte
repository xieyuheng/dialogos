<script context="module">
  export async function preload({ params }) {
    const { book } = params
    const res = await this.fetch(`data/${book}`)
    const init_contents = await res.json()
    return { book, init_contents }
  }
</script>

<script>
  import vm from "@dialogos/vm"
  import yaml from "js-yaml"
  import Frame from "../../components/Frame.svelte"
  import * as ut from "../../ut"
  import { onMount } from "svelte"

  // -- PROP --

  export let book
  export let init_contents

  // -- LOCAL STATE --

  let contents = []
  let mode = "dialog_mode"
  let input_text = ""
  let mini_message = ""

  // -- DOM ELEMENT --

  let ok

  let ok_click = ut.click_handler({
    onclick: async () => {
      await step()
    },
  })

  let status

  let input_buffer

  let input_buffer_focus = () => {
    if (mode === "dialog_mode") {
      mini_message = "Entering reader_comment_mode from dialog_mode."
      mode = "reader_comment_mode"
    }
  }

  // -- LIFE CYCLE --

  onMount(async () => {
    // NOTE first step.
    await step()

    input_buffer.addEventListener("keydown", (event) => {
      if (mode === "reader_comment_mode") {
        if (event.key === "Escape") {
          mini_message =
            "Exiting reader_comment_mode and clear input (because Esc is pressed)."
          mode = "dialog_mode"
          input_text = ""
          input_buffer.blur()
        }
      }
    })
  })

  // -- BUSINESS --

  const env = vm.Env.init({
    book,
    contents: init_contents,
    loader: async (book, module) => {
      const res = await fetch(`data/${book}?module=${module}`)
      const contents = await res.json()
      return contents
    },
  })

  const step = async () => {
    switch (mode) {
      case "dialog_mode":
        return await step_dialog()
      case "reader_input_mode":
        return await step_input()
      case "reader_comment_mode":
        return await step_reader_comment()
    }
  }

  const step_dialog = async () => {
    contents = [...contents, { loading: "Loading next statement." }]
    const stmt = await vm.Env.next(env)
    if (stmt["get_reader_input"]) {
      contents.pop()
      contents = [...contents, ...stmt["get_reader_input"]]
      mode = "reader_input_mode"
      mini_message = "Entering reader_input_mode."
    } else {
      contents.pop()
      contents = [...contents, stmt]
      mini_message = ""
    }
  }

  const step_input = async () => {
    if (ut.string_is_blank(input_text)) {
      mini_message = "The input buffer is empty. You should enter your answer."
    } else {
      const data = yaml.safeLoad(input_text)
      env.data_stack.push(data)
      contents = [...contents, { reader_input: data }]
      input_text = ""
      mode = "dialog_mode"
      mini_message = "Back to dialog_mode from reader_input_mode."
      await step()
    }
  }

  const step_reader_comment = async () => {
    if (ut.string_is_blank(input_text)) {
      mini_message =
        "No input text, go back to dialog_mode from reader_comment_mode."
      mode = "dialog_mode"
      input_text = ""
    } else {
      mini_message =
        "Write down reader comment, and go back to dialog_mode from reader_comment_mode."
      mode = "dialog_mode"
      contents = [...contents, { reader_comment: input_text }]
      input_text = ""
    }
  }
</script>

<svelte:head>
  <title>Book: {book}</title>
</svelte:head>

<div class="book">
  <div class="frame-list">
    {#each contents as content, index (index)}
      <div class="frame">
        <Frame {content} {index} />
      </div>
    {/each}
  </div>
  <div class="reader-input">
    <button class="status" bind:this="{status}">
      <abbr title="{mode}">
        {#if mode === 'dialog_mode'}
          <img src="cute-dialog-64px.png" alt="dialog" width="40" height="40" />
        {:else if mode === 'reader_input_mode'}
          <img
            src="cute-ask-question-64px.png"
            alt="input"
            width="40"
            height="40" />
        {:else if mode === 'reader_comment_mode'}
          <img
            src="cute-edit-file-64px.png"
            alt="comment"
            width="40"
            height="40" />
        {/if}
      </abbr>
    </button>
    <textarea
      class="buffer"
      spellcheck="false"
      bind:this="{input_buffer}"
      bind:value="{input_text}"
      on:focus="{input_buffer_focus}"></textarea>
    <button class="ok" bind:this="{ok}" on:click="{ok_click}">
      {#if mode === 'dialog_mode'}
        <img
          src="cute-circled-chevron-down-64px.png"
          alt="next"
          width="40"
          height="40" />
      {:else if mode === 'reader_input_mode'}
        <img
          src="cute-paper-plane-64px.png"
          alt="send"
          width="40"
          height="40" />
      {:else if mode === 'reader_comment_mode'}
        <img src="cute-ok-64px.png" alt="edit" width="40" height="40" />
      {/if}
    </button>
  </div>
  <pre class="mini-buffer">
    {#if mini_message}➽ {mini_message}{/if}
  </pre>
</div>

<style>
  .book {
    display: grid;
    grid-template-rows: 90fr 7fr 3fr;
    height: 100vh;
    width: 100vw;
  }

  .frame-list {
    overflow-y: auto;
    scroll-snap-type: y proximity;
  }

  .frame {
    scroll-snap-align: end;
  }

  .reader-input {
    border-top: thin solid;
    display: grid;
    grid-template-columns: 45px auto 45px;
  }

  .reader-input .buffer {
    resize: none;
  }

  .reader-input .status,
  .reader-input .ok {
    font-size: 1.3em;
    cursor: pointer;

    color: black;
    background: white;
    border-color: white;
  }

  .mini-buffer {
    font-size: 0.7em;
    /* NOTE We use the following paddings
       to avoid the round corners on some phone. */
    padding-left: 2.7em;
    padding-right: 2.7em;
    border-top: thin solid;
    border-color: black;
    background: #f9dbd2;
    color: #666666;
  }

  abbr[title] {
    text-decoration: none !important;
  }
</style>
