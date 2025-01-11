import BoldVisitor from './BoldVisitor'
import ItalicVisitor from './ItalicVisitor'
import TextVisitor from './TextVisitor'

export default class SentenceVisitor {
  static get visitors () {
    return {
      BOLD: BoldVisitor,
      ITALIC: ItalicVisitor,
      TEXT: TextVisitor,
    }
  }
  
  static visit ({ node, textIndex, render, parentType }) {
    return this.visitorFor(node.type).visit({ node, textIndex, render, parentType })
  }
  
  private static visitorFor (type) {
    return this.visitors[type]
  }
}