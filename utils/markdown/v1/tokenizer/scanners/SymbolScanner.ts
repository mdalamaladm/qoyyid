import Token from '../Token'

export default class SymbolScanner {
  static fromString (plainMarkdown) {
    const symbols = {
      '_': 'UNDERSCORE',
      '*': 'STAR',
      '\n': 'NEWLINE',
      '- ': 'DASHSPACE',
      ' ': 'SPACE',
      '\t': 'TAB'
    }
    
    let char = plainMarkdown[0]
    if (char === '-') char += plainMarkdown[1]
    
    if (symbols[char] !== undefined) return new Token(symbols[char], char)
    
    return null
  }
}