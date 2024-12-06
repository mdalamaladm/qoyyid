import Node from './Node'

export default class ListNode {
  sentences: Node[]
  consumed: number
  
  constructor (sentences: Node[], consumed: number) {
    this.sentences = sentences
    this.consumed = consumed
  }
}