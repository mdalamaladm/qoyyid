import SentenceVisitor from './SentenceVisitor'

export default class ItalicVisitor {
  static visit ({ node, textIndex, render, parentType }) {
    const res = this.sentencesFor({ node: node.value, textIndex, render,parentType })
  
    return render?.italic?.(res, textIndex) || `<i>${res}</i>`
  }
  
  private static sentencesFor ({ node, textIndex, render, parentType }) {
    const res = node.map(n => this.sentenceVisitor.visit({ node: n, textIndex, render, parentType }))
    
    if (render) return res
    else return res?.join('') || ''
  }
  
  private static get sentenceVisitor () {
    return SentenceVisitor
  }
}