import Node from '../nodes/Node'

export default class TextParser {
  static match(tokens) {
    let consumed = 0
    
    if (tokens.peek('SOF')) consumed++
    
    const current = tokens.offset(consumed)

    if (current.peek('WORD')) return new Node('TEXT', current.first.value, consumed + 1, true)
    else if (current.peek('SPACE')) return new Node('TEXT', current.first.value, consumed + 1)
    else if (current.peek('TAB')) return new Node('TEXT', current.first.value, consumed + 1)
    else if (current.peek('STAR')) return new Node('TEXT', current.first.value, consumed + 1)
    else if (current.peek('UNDERSCORE')) return new Node('TEXT', current.first.value, consumed + 1)
    else if (current.peek('DASHSPACE')) return new Node('TEXT', current.first.value, consumed + 1)
    
    
    return null
  }
}