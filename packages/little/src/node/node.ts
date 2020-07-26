export abstract class Node {}

export class Element extends Node {
  constructor(
    public tag: string,
    public attributes: { [key: string]: string },
    public contents: Array<Node>
  ) {
    super()
  }
}
export class Text extends Node {
  constructor(public text: string) {
    super()
  }
}
