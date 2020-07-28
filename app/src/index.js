import { h, text, app } from "hyperapp"
import li from "little"

// -- EFFECTS & SUBSCRIPTIONS --

// -- ACTIONS --

const StartEditingFilter = (state) => ({ ...state, editingFilter: true })
const StopEditingFilter = (state) => ({ ...state, editingFilter: false })
const SetFilter = (state, word) => ({ ...state, filter: word })
const SelectStory = (state, id) => ({
  ...state,
  reading: id,
  stories: {
    ...state.stories, //keep stories the same, except for:
    [id]: {
      ...state.stories[id], //keep this story the same, except for:
      seen: true,
    },
  },
})

// -- VIEWS ---

const emphasize = (word, string) =>
  string
    .split(" ")
    .map((x) =>
      x.toLowerCase() === word.toLowerCase()
        ? h("em", {}, text(x + " "))
        : text(x + " ")
    )

const storyThumbnail = (props) =>
  h(
    "li",
    {
      onclick: [SelectStory, props.id],
      class: {
        unread: props.unread,
        reading: props.reading,
      },
    },
    [
      h("p", { class: "title" }, emphasize(props.filter, props.title)),
      h("p", { class: "author" }, text(props.author)),
    ]
  )

const storyList = (props) =>
  h("div", { class: "stories" }, [
    h(
      "ul",
      {},
      Object.keys(props.stories).map((id) =>
        storyThumbnail({
          id,
          title: props.stories[id].title,
          author: props.stories[id].author,
          unread: !props.stories[id].seen,
          reading: props.reading === id,
          filter: props.filter,
        })
      )
    ),
  ])

const filterView = (props) =>
  h("div", { class: "filter" }, [
    text("Filter:"),

    props.editingFilter
      ? h("input", {
          type: "text",
          value: props.filter,
          oninput: (state, event) => SetFilter(state, event.target.value),
        })
      : h("span", { class: "filter-word" }, text(props.filter)),

    props.editingFilter
      ? h("button", { onclick: StopEditingFilter }, text("\u2713"))
      : h("button", { onclick: StartEditingFilter }, text("\u270E")),
  ])

const storyDetail = (props) =>
  h("div", { class: "story" }, [
    props && h("h1", {}, text(props.title)),
    props &&
      h(
        "p",
        {},
        text(`
    Lorem ipsum dolor sit amet, consectetur adipiscing
    elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, qui
    nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat.
            `)
      ),
    props && h("p", { class: "signature" }, text(props.author)),
  ])

const autoUpdateView = (props) =>
  h("div", { class: "autoupdate" }, [
    text("Auto update: "),
    h("input", { type: "checkbox" }),
  ])

const container = (content) => h("div", { class: "container" }, content)

// -- RUN --

app({
  init: {
    filter: "ocean",
    reading: "113",
    stories: {
      "112": {
        title: "The Ocean is Sinking",
        author: "Kat Stropher",
        seen: false,
      },
      "113": {
        title: "Ocean life is brutal",
        author: "Surphy McBrah",
        seen: true,
      },
      "114": {
        title: "Family friendly fun at the ocean exhibit",
        author: "Guy Prosales",
        seen: true,
      },
    },
  },
  node: document.getElementById("app"),
  view: (state) =>
    container([
      filterView(state),
      storyList(state),
      storyDetail(state.reading && state.stories[state.reading]),
      autoUpdateView(state),
    ]),
})
