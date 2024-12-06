import SentenceVisitor from './SentenceVisitor'

export default class ParagraphVisitor {
  static visit (bodyChildNode, render) {
    const res = this.sentencesFor(bodyChildNode, render)

    return render?.paragraph?.(res) || `<p>${res}</p>`
  }
  
  private static sentencesFor (bodyChildNode, render) {
    const res = bodyChildNode.children.map(node => this.sentenceVisitor.visit(node, render))
    
    if (render) return res
    return res?.join('') || ''
  }
  
  private static get sentenceVisitor () {
    return SentenceVisitor
  }
}