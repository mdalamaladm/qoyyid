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
  
  static visit (node, render) {
    return this.visitorFor(node.type).visit(node, render)
  }
  
  private static visitorFor (type) {
    return this.visitors[type]
  }
}