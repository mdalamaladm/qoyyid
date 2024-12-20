import BaseParser from './BaseParser'

import ListsParser from './ListsParser'

import matchStar from './matches/matchStar'

export default class ListsAndNewlineParser {
  static match (tokens) {
    let result = ListsParser.match(tokens)
    
    if (!result) return null
    
    let { nodes, consumed } = result
    
    if (tokens.peekAt(consumed, 'NEWLINE NEWLINE')) consumed += 2
    else if (tokens.peekAt(consumed, 'NEWLINE DASHSPACE')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE WORD')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE UNDERSCORE')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE STAR')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE TAB')) consumed += 1
    else if (tokens.peekAt(consumed, 'NEWLINE SPACE')) consumed += 1
    else return null
    
    return { nodes, consumed }
  }
}