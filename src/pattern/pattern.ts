import * as Node from "../node"

export abstract class Pattern {}

export class Var extends Pattern {
  constructor(
    public name: string,
  ) {
    super()
  }
}

export class Element extends Pattern {
  constructor(
    public tag: string,
    public attributes: { [key: string]: string | RegExp },
    public contents: Array<Pattern>,
    public tail?: string,
  ) {
    super()
  }
}

export class Text extends Pattern {
  constructor(
    public text: string | RegExp,
  ) {
    super()
  }
}
