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
  import Frame from "../../components/Frame.svelte"
  import * as ut from "../../ut"
  import { onMount } from "svelte"

  // -- PROP --

  export let book
  export let init_contents

  // -- GLOBAL STATE --

  import { contents, mini_message, input_text, mode } from "../../stores"

  import {
    fundamental_mode,
    reader_input_mode,
    reader_comment_mode,
  } from "../../modes"

  $mode = fundamental_mode

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
    if ($mode === fundamental_mode) {
      $mini_message = `Entering ${reader_comment_mode.name} from ${$mode.name}.`
      $mode = reader_comment_mode
    }
  }

  // -- LIFE CYCLE --

  onMount(async () => {
    await next()
  })

  // -- BUSINESS --

  $contents = []

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
    await $mode.ok({ env, next })
  }
</script>

<svelte:head>
  <title>{book}</title>
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
      <abbr title="{$mode.name}">
        <img
          src="{$mode.status_icon.src}"
          alt="{$mode.status_icon.alt}"
          width="40"
          height="40" />
      </abbr>
    </button>
    <textarea
      class="buffer"
      spellcheck="false"
      bind:this="{input_buffer}"
      bind:value="{$input_text}"
      on:focus="{input_buffer_focus}"></textarea>
    <button class="ok" bind:this="{ok}" on:click="{ok_click}">
      <img
        src="{$mode.ok_icon.src}"
        alt="{$mode.ok_icon.alt}"
        width="40"
        height="40" />
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
