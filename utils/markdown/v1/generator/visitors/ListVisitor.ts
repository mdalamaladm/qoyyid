import SentenceVisitor from './SentenceVisitor'

export default class ListVisitor {
  static visit (listNode, render) {
    const res = this.sentencesFor(listNode, render)
  
    return render?.list?.(res) || `
      <li>${res}</li>`
  }
  
  private static sentencesFor (listNode, render) {
    const res = listNode.sentences.map(node => this.sentenceVisitor.visit(node, render))
  
    if (render) return res
    else return res?.join('') || ''
  }
  
  private static get sentenceVisitor () {
    return SentenceVisitor
  }
}