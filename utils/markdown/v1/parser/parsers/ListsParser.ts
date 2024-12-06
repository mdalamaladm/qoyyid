import ListNode from '../nodes/ListNode'

import BaseParser from './BaseParser'
import ListParser from './ListParser'

import matchStar from './matches/matchStar'

export default class ListsParser extends BaseParser {
  static match (tokens) {
    let consumed = 0
    
    const { nodes, consumed: sConsumed, isEmpty } = matchStar(tokens.offset(consumed), [ListParser, 'NEWLINE'])
    
    if (isEmpty) return null

    consumed += sConsumed
    
    if (tokens.peekAt(consumed - 1, 'NEWLINE')) consumed--
    
    return { nodes, consumed }
  }
}