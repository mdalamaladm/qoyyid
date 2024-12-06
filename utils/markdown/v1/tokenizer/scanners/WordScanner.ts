import Token from '../Token'

import SymbolScanner from './SymbolScanner'

export default class WordScanner {
  static fromString (plainMarkdown) {
    let word = ''
    
    for (let index = 0; index < plainMarkdown.length; index++) {
      let char = plainMarkdown[index]
      
      if (char === '-' && plainMarkdown[index + 1] === ' ') char = '- '

      const token = SymbolScanner.fromString(char)
      
      if (token) break
      
      word += char
    }
    
    if (word) return new Token('WORD', word)
    else return null
  }
}