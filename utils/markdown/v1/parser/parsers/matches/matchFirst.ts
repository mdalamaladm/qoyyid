export default function matchFirst (tokens, ...parsers) {
    for (const parser of parsers) {
      const node = parser.match(tokens)
      
      if (node) return node
    }
    
    return null
  }