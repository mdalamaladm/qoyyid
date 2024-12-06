import SentenceVisitor from './SentenceVisitor'

export default class ItalicVisitor {
  static visit (node, render) {
    const res = this.sentencesFor(node.value, render)
  
    return render?.italic?.(res) || `<i>${res}</i>`
  }
  
  private static sentencesFor (nodes, render) {
    const res = nodes.map(node => this.sentenceVisitor.visit(node, render))
    
    if (render) return res
    else return res?.join('') || ''
  }
  
  private static get sentenceVisitor () {
    return SentenceVisitor
  }
}