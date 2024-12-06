import BaseParser from './BaseParser'

import SentenceAndEofParser from './SentenceAndEofParser'
import SentenceAndNewlineParser from './SentenceAndNewlineParser'

import matchFirst from './matches/matchFirst'

export default class ParagraphParser extends BaseParser {
  static match (tokens) {
    return matchFirst(tokens,
      SentenceAndNewlineParser,
      SentenceAndEofParser,
    )
  }
}