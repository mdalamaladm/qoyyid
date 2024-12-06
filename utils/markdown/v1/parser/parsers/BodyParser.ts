import BaseParser from './BaseParser'

import BodyChildParser from './BodyChildParser'

import BodyNode from '../nodes/BodyNode'

import matchStar from './matches/matchStar'

export default class BodyParser extends BaseParser {
  static match (tokens) {
    const { nodes, consumed, isEmpty } = matchStar(tokens, [BodyChildParser])
    
    if (isEmpty) return null
    
    return new BodyNode(nodes, consumed)
  }
}