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

  // -- GLOBAL STATE --

  import { contents, mini_message, input_text, mode_name } from "../../stores"
  import { reader_input_mode, reader_comment_mode } from "../../modes"

  $mode_name = "dialog_mode"

  // -- DOM ELEMENT --

  let ok

  let ok_click = ut.click_handler({
    onclick: async () => {
      await next()
    },
  })

  let status

  let input_buffer

  let input_buffer_focus = () => {
    if ($mode_name === "dialog_mode") {
      $mini_message = "Entering reader_comment_mode from dialog_mode."
      $mode_name = "reader_comment_mode"
    }
  }

  // -- LIFE CYCLE --

  onMount(async () => {
    await next()
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

  const next = async () => {
    switch ($mode_name) {
      case "dialog_mode":
        return await next_dialog({ env, next })
      case "reader_input_mode":
        return await reader_input_mode.onnext({ env, next })
      case "reader_comment_mode":
        return await reader_comment_mode.onnext({ env, next })
    }
  }

  const next_dialog = async () => {
    $contents = [...$contents, { Loading: "Loading next statement... ⏳" }]
    // TODO fix this use of stmts like GET_READER_INPUT in book.
    const content = await vm.Env.next(env)
    $contents.pop()

    let prompt_contents = vm.Env.match_stmt_name(content, "GET_READER_INPUT")
    if (prompt_contents) {
      $contents = [...$contents, ...prompt_contents]
      $mode_name = "reader_input_mode"
      $mini_message = "Entering reader_input_mode."
      return
    }

    $contents = [...$contents, content]
    $mini_message = ""
  }
</script>

<svelte:head>
  <title>Book: {book}</title>
</svelte:head>

<div class="book">
  <div class="frame-list">
    {#each $contents as content, index (index)}
      <div class="frame">
        <Frame {content} {index} />
      </div>
    {/each}
  </div>
  <div class="reader-input">
    <button class="status" bind:this="{status}">
      <abbr title="{$mode_name}">
        {#if $mode_name === 'dialog_mode'}
          <img src="cute-dialog-64px.png" alt="dialog" width="40" height="40" />
        {:else if $mode_name === 'reader_input_mode'}
          <img
            src="cute-ask-question-64px.png"
            alt="input"
            width="40"
            height="40" />
        {:else if $mode_name === 'reader_comment_mode'}
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
      bind:value="{$input_text}"
      on:focus="{input_buffer_focus}"></textarea>
    <button class="ok" bind:this="{ok}" on:click="{ok_click}">
      {#if $mode_name === 'dialog_mode'}
        <img
          src="cute-circled-chevron-down-64px.png"
          alt="next"
          width="40"
          height="40" />
      {:else if $mode_name === 'reader_input_mode'}
        <img
          src="cute-paper-plane-64px.png"
          alt="send"
          width="40"
          height="40" />
      {:else if $mode_name === 'reader_comment_mode'}
        <img src="cute-ok-64px.png" alt="edit" width="40" height="40" />
      {/if}
    </button>
  </div>
  <pre class="mini-buffer">
    {#if $mini_message}➽ {$mini_message}{/if}
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
