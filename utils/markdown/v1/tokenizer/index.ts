import Token from './Token'
import TokenList from './TokenList'

import SymbolScanner from './scanners/SymbolScanner'
import WordScanner from './scanners/WordScanner'

class InvalidTokenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidTokenError'
  }
}

export default class Tokenizer {
  static get scanners () {
    return [
      SymbolScanner,
      WordScanner,
    ]
  }
  
  tokenize (plainMarkdown) {
    if (!plainMarkdown) return new TokenList([Token.endOfFile])
    
    return new TokenList([Token.startOfFile, ...this.tokenAsArray(plainMarkdown)])
  }
  
  private tokenAsArray (plainMarkdown) {
    if (plainMarkdown === null || plainMarkdown === '') return [Token.endOfFile]
    
    const token = this.scanOneToken(plainMarkdown)
    
    return [token, ...this.tokenAsArray(plainMarkdown.slice(token.length))]
  }
  
  private scanOneToken (plainMarkdown) {
    for (const scanner of Tokenizer.scanners) {
      const token = scanner.fromString(plainMarkdown)
      
      if (!token) continue
      
      return token
    }
    
    throw new InvalidTokenError(`The scanners could not match this given input: ${plainMarkdown}`)
  }
}