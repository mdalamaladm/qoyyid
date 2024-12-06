export default class NewlineVisitor {
  static visit (node, render) {
    return render?.newLine?.() || `<br>`
  }
}