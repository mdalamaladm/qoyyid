import ParagraphVisitor from './ParagraphVisitor'
import NewlineVisitor from './NewlineVisitor'
import UnorderedListVisitor from './UnorderedListVisitor'

export default class BodyVisitor {
  static get visitors () {
    return {
      PARAGRAPH: ParagraphVisitor,
      UNORDERED_LIST: UnorderedListVisitor,
      NEWLINE: NewlineVisitor
    }
  }

  static visit (bodyNode, render) {
    const res = bodyNode?.children.map(bodyChildNode => BodyVisitor.visitorFor(bodyChildNode.type).visit(bodyChildNode, render))
  
    if (render) return render.body(res)
    else return res?.join('') || ''
  }
  
  private static visitorFor (type) {
    return this.visitors[type]
  }
}