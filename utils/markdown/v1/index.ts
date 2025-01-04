import Generator from './generator'
import Parser from './parser'
import Tokenizer from './tokenizer'

export default class Markdown {
  static generate ({ ast, markdown, render }) {
    let parsed = null
    
    if (ast) parsed = ast
    else {
      const tokenized = this.tokenizer.tokenize(markdown)

      parsed = this.parser.parse(tokenized)
    }

    const generated = this.generator.generate(parsed, render)
    
    return generated
  }
  
  static parse (markdown) {
    const tokenized = this.tokenizer.tokenize(markdown)

    const parsed = this.parser.parse(tokenized)
    
    return parsed
  }
  
  static get generator () {
    return new Generator()
  }
  
  static get parser () {
    return new Parser()
  }
  
  static get tokenizer () {
    return new Tokenizer()
  }
}