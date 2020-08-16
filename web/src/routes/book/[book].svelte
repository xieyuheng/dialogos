<script context="module">
  export async function preload({ params }) {
    const { book } = params
    const res = await this.fetch(`data/${book}`)
    const nodes = await res.json()
    return { book, nodes }
  }
</script>

<script>
  import li, { h, text } from "@the-little-books/little"
  import Frame from "../../components/Frame.svelte"
  import * as ut from "../../ut"
  import { onMount } from "svelte"
  import { fade, fly } from "svelte/transition"

  // -- PROP --

  export let book
  export let nodes

  // -- LOCAL STATE --

  let frames = []
  let mode = "normal-mode"
  let input_text = ""
  let mini_message = ""

  // -- DOM ELEMENT --

  let ok

  let ok_icons = {
    "normal-mode": "⮛",
    "input-mode": "✉",
    "reader-comment-mode": "✉",
  }

  let ok_click = ut.click_handler({
    onclick: async () => {
      await step()
    },
  })

  let status

  let status_icons = {
    "normal-mode": "✯",
    "input-mode": "❓",
    "reader-comment-mode": "✍",
  }

  let input_buffer

  let input_buffer_focus = () => {
    if (mode === "normal-mode") {
      mini_message = "Entering reader-comment-mode from normal-mode."
      mode = "reader-comment-mode"
    }
  }

  // -- LIFE CYCLE --

  onMount(async () => {
    // NOTE first step.
    await step()

    input_buffer.addEventListener("keydown", (event) => {
      if (mode === "reader-comment-mode") {
        if (event.key === "Escape") {
          mini_message = "Exiting reader-comment-mode and clear input (because Escape is pressed)."
          mode = "normal-mode"
          input_text = ""
          input_buffer.blur()
        }
      }
    })
  })

  // -- BUSINESS --

  const env = li.Env.init({
    book,
    nodes,
    module: "index",
    loader: async (book, module) => {
      const res = await fetch(`data/${book}?module=${module}`)
      const nodes = await res.json()
      return nodes
    },
  })

  const step = async () => {
    switch (mode) {
      case "normal-mode":
        return await step_normal()
      case "input-mode":
        return await step_input()
      case "reader-comment-mode":
        return await step_reader_comment()
    }
  }

  const step_normal = async () => {
    const node = await li.Env.next(env)
    if (node.kind === "Node.Element") {
      if (node.tag === "input-node") {
        mode = "input-mode"
        mini_message = "Entering input-mode."
      } else {
        frames = [...frames, node]
        mini_message = ""
      }
    } else {
      // NOTE Top level text nodes are viewed as writer comment.
      console.log("Writer comment:", node.value)
      await step()
    }
  }

  const step_input = async () => {
    if (ut.string_is_blank(input_text)) {
      mini_message = "The input buffer is empty. You should enter your answer."
    } else {
      const nodes = li.Node.parse_nodes(input_text)
      // NOTE We only use the first node.
      const [node] = nodes
      env.node_stack.push(node)
      frames = [...frames, h("reader-input", {}, node)]
      input_text = ""
      mode = "normal-mode"
      mini_message = "Back to normal-mode from input-mode."
      await step()
    }
  }

  const step_reader_comment = async () => {
    if (ut.string_is_blank(input_text)) {
      mini_message = "No input text, go back to normal-mode from reader-comment-mode."
      mode = "normal-mode"
      input_text = ""
    } else {
      mini_message = "Write down reader comment, and go back to normal-mode from reader-comment-mode."
      mode = "normal-mode"
      frames = [...frames, h("reader-comment", {}, text(input_text))]
      input_text = ""
    }
  }
</script>

<svelte:head>
  <title>Book: {book}</title>
</svelte:head>

<div class="book">
  <div class="frame-list">
    {#each frames as node, index}
      <div class="frame" transition:fly|local>
        <Frame {node} {index} />
      </div>
    {/each}
  </div>
  <div class="reader-input">
    <button class="status" bind:this="{status}">
      <abbr title="{mode}">{status_icons[mode]}</abbr>
    </button>
    <textarea
      class="buffer"
      bind:this="{input_buffer}"
      bind:value="{input_text}"
      on:focus="{input_buffer_focus}"></textarea>
    <button class="ok" bind:this="{ok}" on:click="{ok_click}">
      {ok_icons[mode]}
    </button>
  </div>
  <pre class="mini-buffer">{mini_message}</pre>
</div>

<style>
  .frame-list {
    position: fixed;
    height: 90%;
    width: 100%;
    overflow-y: auto;
    scroll-snap-type: y proximity;
  }

  .frame {
    scroll-snap-align: end;
  }

  .reader-input {
    position: fixed;
    bottom: 3%;
    height: 7%;
    width: 100%;
    border-top: thin solid;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .reader-input .status {
    flex: 5%;
    min-width: 30px;
    font-size: 1.5em;
    cursor: help;
  }

  .reader-input .buffer {
    flex: 90%;
  }

  .reader-input .ok {
    flex: 5%;
    min-width: 30px;
    font-size: 1.3em;
    cursor: pointer;
  }

  .mini-buffer {
    position: fixed;
    bottom: 0;
    height: 3%;
    font-size: 0.7em;
    padding-left: 3px;
    padding-right: 3px;
    width: 100%;
    border-top: thin solid;
    border-color: black;
    background: #eee;
    color: #666;
  }

  abbr[title] {
    text-decoration: none !important;
  }
</style>
