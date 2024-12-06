import BaseParser from './BaseParser'

import SentenceParser from './SentenceParser'

import BodyChildNode from '../nodes/BodyChildNode'

import matchStar from './matches/matchStar'

export default class SentenceAndEofParser extends BaseParser {
  static match (tokens) {
    let { nodes, consumed, isEmpty } = matchStar(tokens, [SentenceParser])
    
    if (isEmpty) return null
    
    if (tokens.peekAt(consumed, 'EOF')) {
      consumed += 1
    } else if (tokens.peekAt(consumed, 'NEWLINE EOF')) {
      consumed += 2
    } else return null
    
    return new BodyChildNode('PARAGRAPH', nodes, consumed)
  }
}