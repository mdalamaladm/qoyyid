import Node from '../nodes/Node'

import SentenceParser from './SentenceParser'

import matchStar from './matches/matchStar'

export default class ItalicParser {
  static match(tokens) {
    let consumed = 0
    
    if (tokens.peek('SOF')) consumed++
  
    if (tokens.peekAt(consumed, 'UNDERSCORE UNDERSCORE')) consumed += 2
    else return null
    
    const { nodes, consumed: tConsumed, isEmpty } = matchStar(tokens.offset(consumed), [SentenceParser], 'UNDERSCORE UNDERSCORE')
    
    if (isEmpty) return null
    
    consumed += tConsumed
    
    if (tokens.peekAt(consumed, 'UNDERSCORE UNDERSCORE')) consumed += 2
    else return null
    
    return new Node('ITALIC', nodes, consumed)
  }
}