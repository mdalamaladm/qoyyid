import BodyVisitor from './visitors/BodyVisitor'

export default class Generator {
  generate (ast, render) {
    return this.bodyVisitor.visit(ast, render)
  }
  
  private get bodyVisitor () {
    return BodyVisitor
  }
}