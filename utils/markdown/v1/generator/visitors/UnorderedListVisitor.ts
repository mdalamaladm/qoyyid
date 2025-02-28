import ListVisitor from './ListVisitor'

export default class UnorderedListVisitor {
  static visit (bodyChildNode, render) {
    const res = this.listsFor(bodyChildNode, render)
  
    return render?.unorderedList?.(res) || `<ul>${res}</ul>`
  }
  
  private static listsFor (bodyChildNode, render) {
    const res = bodyChildNode.children.map((listNode, index) => this.listVisitor.visit({ listNode, listIndex: index, render, parentType: 'ul' }))
    
    if (render) return res
    else return res?.join('') || ''
  }
  
  private static get listVisitor () {
    return ListVisitor
  }
}