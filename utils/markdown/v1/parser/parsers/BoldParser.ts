import Node from '../nodes/Node'

import SentenceParser from './SentenceParser'

import matchStar from './matches/matchStar'

export default class BoldParser {
  static match(tokens) {
    let consumed = 0
    
    if (tokens.peek('SOF')) consumed++
  
    if (tokens.peekAt(consumed, 'STAR STAR')) consumed += 2
    else return null
    
    const { nodes, consumed: tConsumed, isEmpty } = matchStar(tokens.offset(consumed), [SentenceParser], 'STAR STAR')
    
    if (isEmpty) return null
    
    consumed += tConsumed
    
    if (tokens.peekAt(consumed, 'STAR STAR')) consumed += 2
    else return null
    
    return new Node('BOLD', nodes, consumed)
  }
}