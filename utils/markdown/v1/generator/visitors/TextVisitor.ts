export default class TextVisitor {
  static visit (node, render) {
    return render?.text?.(node.value, node.isWord) || node.value
  }
}