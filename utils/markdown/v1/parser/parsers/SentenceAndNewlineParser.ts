import BaseParser from './BaseParser'

import SentenceParser from './SentenceParser'

import BodyChildNode from '../nodes/BodyChildNode'

import matchStar from './matches/matchStar'

export default class SentenceAndNewlineParser extends BaseParser {
  static match (tokens) {
    let { nodes, consumed, isEmpty } = matchStar(tokens, [SentenceParser])
  
    if (isEmpty) return null
    
    if (tokens.peekAt(consumed, 'NEWLINE NEWLINE')) consumed += 2
    else if (tokens.peekAt(consumed, 'NEWLINE DASHSPACE')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE WORD')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE UNDERSCORE')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE STAR')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE TAB')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE SPACE')) consumed += 1
    else return null
    
    
    return new BodyChildNode('PARAGRAPH', nodes, consumed)
  }
}