import { h, text } from "hyperapp"
import li, { p, v } from "@the-little-books/little"
import "./dialog.css"

export const dialog = (index) => (data) =>
  li.cases(data, [
    [
      p("dialog", [
        p("teacher", [v("teacher")], { tail: "teacher_notes" }),
        p("student", [v("student")], { tail: "student_notes" }),
      ]),
      ({
        vars: { teacher, student },
        tails: { teacher_notes, student_notes },
      }) =>
        h("div", { class: "dialog" }, [
          h("pre", { class: "teacher" }, [
            ...markup(teacher.value),
            teacher_notes.length > 0 ? h("hr", {}) : null,
            ...teacher_notes.map((note) => noteView(note)),
          ]),
          h("pre", { class: "index" }, text(index + 1)),
          h("pre", { class: "student" }, [
            ...markup(student.value),
            student_notes.length > 0 ? h("hr", {}) : null,
            ...student_notes.map((note) => noteView(note)),
          ]),
        ]),
    ],
  ])

const markup = (str) => {
  const result = str.match(/^(.*?)\^\[(.*?)\](.*)/msu)

  if (result !== null) {
    const [_target, prev, name, rest] = result
    return [
      text(prev),
      h("span", { class: "note-name" }, text(name)),
      ...markup(rest),
    ]
  } else {
    return [text(str)]
  }
}

const noteView = (data) =>
  li.cases(data, [
    [
      p("note", [v("content")]),
      ({ vars: { content } }) =>
        h("pre", { class: "note" }, [
          text(" "),
          h("span", { class: "note-name" }, text(data.attributes.name)),
          text(" "),
          text(content.value),
        ]),
    ],
  ])
