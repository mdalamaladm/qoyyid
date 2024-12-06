import BaseParser from './BaseParser'

import ListsAndNewlineParser from './ListsAndNewlineParser'
import ListsAndEofParser from './ListsAndEofParser'

import BodyChildNode from '../nodes/BodyChildNode'

import matchFirst from './matches/matchFirst'

export default class UnorderedListParser {
  static match (tokens) {
    const result = matchFirst(tokens, ListsAndEofParser, ListsAndNewlineParser)
    
    if (!result) return null
    
     const { nodes, consumed } = result
    
    return new BodyChildNode('UNORDERED_LIST', nodes, consumed)
  }
}