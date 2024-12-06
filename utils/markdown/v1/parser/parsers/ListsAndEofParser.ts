import BaseParser from './BaseParser'

import ListsParser from './ListsParser'

import matchStar from './matches/matchStar'

export default class ListsAndEofParser {
  static match (tokens) {
    let result = ListsParser.match(tokens)
    
    if (!result) return null
    
    let { nodes, consumed } = result
    
    if (tokens.peekAt(consumed, 'EOF')) {
      consumed += 1
    } else if (tokens.peekAt(consumed, 'NEWLINE EOF')) {
      consumed += 2
    } else return null
    
    return { nodes, consumed }
  }
}