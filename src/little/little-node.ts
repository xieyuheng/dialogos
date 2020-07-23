export abstract class LittleNode {}

export class LittleElement extends LittleNode {
  constructor(
    public tag: string,
    public attributes: { [key: string]: string },
    public contents: Array<LittleNode>
  ) {
    super()
  }
}
export class LittleText extends LittleNode {
  constructor(
    public text: string,
  ) {
    super()
  }
}
