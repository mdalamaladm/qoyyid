import SentenceVisitor from './SentenceVisitor'

export default class ListVisitor {
  static visit ({ listNode, listIndex, render, parentType }) {
    const res = this.sentencesFor({ listNode, render, parentType })
  
    return render?.list?.(res, listIndex) || `
      <li>${res}</li>`
  }
  
  private static sentencesFor ({ listNode, render, parentType }) {
    const res = listNode.sentences.map((node, textIndex) => this.sentenceVisitor.visit({ node, textIndex, render, parentType }))
  
    if (render) return res
    else return res?.join('') || ''
  }
  
  private static get sentenceVisitor () {
    return SentenceVisitor
  }
}