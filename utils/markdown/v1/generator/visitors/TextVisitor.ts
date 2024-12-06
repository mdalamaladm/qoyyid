export default class TextVisitor {
  static visit (node, render) {
    if (node.isWord) return render?.text?.(node.value, node.isWord) || `${node.value}`
    
    return render?.text?.(node.value, node.isWord) || node.value
  }
}