import ParagraphNode from './ParagraphNode'
import UnorderedListNode from './UnorderedListNode'

export default class BodyNode {
  children: (ParagraphNode & UnorderedListNode)[]
  consumed: number
  
  constructor (children: (ParagraphNode & UnorderedListNode)[], consumed: number) {
    this.children = children
    this.consumed = consumed
  }
}