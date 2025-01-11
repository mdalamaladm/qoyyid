import SentenceVisitor from './SentenceVisitor'

export default class BoldVisitor {
  static visit (node, render) {
    const res = this.sentencesFor(node.value, render)
    
    return render?.bold?.(res) || `<b>${res}</b>`
  }
  
  private static sentencesFor ({ nodes, textIndex, render, parentType }) {
    const res = nodes.map(node => this.sentenceVisitor.visit({ node, textIndex, render, parentType }))
  
    if (render) return res
    else return res?.join('') || ''
  }
  
  private static get sentenceVisitor () {
    return SentenceVisitor
  }
}