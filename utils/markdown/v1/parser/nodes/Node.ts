export default class Node {
  type: string
  value: string|Node[]
  consumed: number
  isWord: boolean
  
  constructor (type: string, value: string|Node[], consumed: number, isWord: boolean) {
    this.type = type
    this.value = value
    this.consumed = consumed
    this.isWord = isWord
  }
}