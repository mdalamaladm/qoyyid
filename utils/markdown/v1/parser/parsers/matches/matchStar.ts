export default function matchStar (tokens, parsers, stopAt) {
    const nodes = []
    let consumed = 0
    
    whileLoop:
      while (true) {
        for (const parser of parsers) {
          if (stopAt && tokens.peekAt(consumed, stopAt)) {
            break whileLoop
          }

          if (typeof parser === 'string') {
            if (tokens.peekAt(consumed, parser)) consumed++
            else break whileLoop
            
            continue
          }
  
          const node = parser.match(tokens.offset(consumed))
          
        
          if (!node) break whileLoop
          
          nodes.push(...(Array.isArray(node) ? node : [node]))
          consumed += Array.isArray(node) ? node.reduce((res, cur) => res + cur.consumed, 0) : node.consumed
        }
      }
    
    const isEmpty = nodes.length < 1
    
    return { nodes, consumed, isEmpty }
  }