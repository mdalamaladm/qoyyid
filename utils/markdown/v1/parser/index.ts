import BodyParser from './parsers/BodyParser'

export default class Parser {
  parse (tokens) {
    const body = this.bodyParser.match(tokens)
    
    return body
  }
  
  private get bodyParser () {
    return BodyParser
  }
}