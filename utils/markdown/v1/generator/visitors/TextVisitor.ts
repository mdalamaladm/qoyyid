export default class TextVisitor {
  static visit ({ node, textIndex, render, parentType }) {
    return render?.text?.({ children: node.value, isWord: node.isWord, textIndex, parentType }) || node.value
  }
}