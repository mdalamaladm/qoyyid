import ListNode from '../nodes/ListNode'

import BaseParser from './BaseParser'
import SentenceParser from './SentenceParser'

import matchStar from './matches/matchStar'

export default class ListParser extends BaseParser {
  static match (tokens) {
    let consumed = 0
  
    if (tokens.peek('SOF DASHSPACE')) consumed += 2
    else if (tokens.peek('DASHSPACE')) consumed += 1
    else return null
    
    const { nodes, consumed: sConsumed } = matchStar(tokens.offset(consumed), [SentenceParser])

    consumed += sConsumed
    
    return new ListNode(nodes, consumed)
  }
}