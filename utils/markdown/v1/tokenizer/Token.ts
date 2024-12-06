type TokenType = 'SOF' | 'EOF' | 'UNDERSCORE' | 'STAR' | 'NEWLINE' | 'DASHSPACE' | 'TEXT'

export default class Token {
  type: TokenType
  value: string
  
  constructor(type: TokenType, value: string) {
    this.type = type
    this.value = value
  }
  
  static get startOfFile () {
    return new Token('SOF', '')
  }
  
  static get endOfFile () {
    return new Token('EOF', '')
  }
  
  get length () {
    return this.value.length
  }
}