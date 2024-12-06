import Token from './Token'

export default class TokenList {
  tokens: Token[]
  
  constructor(tokens: Token[]) {
    this.tokens = tokens
  }
  
  peek (types) {
    types = types.split(' ')
  
    if (this.empty) return false
  
    for (const index in types) {
      if (types[index] !== this.tokens[index].type) return false
    }
    
    return true
  }
  
  peekOr (...choices) {
    for (const choice of choices) {
      if (this.peek(choice)) return true
    }
    
    return false
  }
  
  peekAt (index, types) {
    return this.offset(index).peek(types)
  }
  
  get first () {
    return this.tokens[0]
  }
  
  get second () {
    return this.tokens[1]
  }
  
  get third () {
    return this.tokens[2]
  }
  
  get length () {
    return this.tokens.length
  }
  
  get empty () {
    return this.length < 1
  }
  
  offset (index) {
    if (index === 0) return this
    
    return new TokenList(this.tokens.slice(index))
  }
}