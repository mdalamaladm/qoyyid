import BaseParser from './BaseParser'

import ParagraphParser from './ParagraphParser'
import UnorderedListParser from './UnorderedListParser'

import BodyChildNode from '../nodes/BodyChildNode'

import matchFirst from './matches/matchFirst'

export default class BodyChildParser extends BaseParser {
  static match (tokens) {
    const node = matchFirst(tokens, UnorderedListParser, ParagraphParser)
    
    if (node) return node
    
    if (tokens.peek('NEWLINE')) return new BodyChildNode('NEWLINE', [], 1)
    else if (tokens.peek('SOF NEWLINE')) return new BodyChildNode('NEWLINE', [], 2)
    
    return null
  }
}