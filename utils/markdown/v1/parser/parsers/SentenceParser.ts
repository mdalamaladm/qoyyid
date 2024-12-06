import BaseParser from './BaseParser'

import BoldParser from './BoldParser'
import ItalicParser from './ItalicParser'
import TextParser from './TextParser'

import Node from '../nodes/Node'

import matchFirst from './matches/matchFirst'

export default class SentenceParser extends BaseParser {
  static match (tokens) {
    const node = matchFirst(tokens, ItalicParser, BoldParser, TextParser)
    
    if (!node) return null
    
    let nodes = node
    
    if (tokens.peekAt(node.consumed, 'DASHSPACE')) nodes = [node, new Node('TEXT', '- ', 1)]
    
    return nodes
  }
}