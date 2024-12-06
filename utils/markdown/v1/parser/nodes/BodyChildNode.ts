import Node from './Node'
import ListNode from './ListNode'

export default class BodyChildNode {
  type: string
  children: (Node|ListNode)[]
  consumed: number
  
  constructor (type: string, children: (Node|ListNode)[], consumed: number) {
    this.type = type
    this.children = children
    this.consumed = consumed
  }
}