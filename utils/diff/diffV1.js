function copy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function p (obj) {
  return JSON.stringify(obj)
}

function finalFormat (arr) {
  return arr.filter(d => d.action !== 'UNUSED').map(d => {
    const res = copy(d)
    
    delete res.idx
    
    res.old = res.old === undefined || res.old === '~' ? '' : res.old
    res.current = res.current === undefined || res.current === '~' ? '' : res.current
    
    return res
  })
}

function diffV1 (oldArrParam, currentArrParam) {
  console.log('===')
  let res = []
  let oldArr = copy(oldArrParam)
  let currentArr = copy(currentArrParam)
  
  let oldLength = oldArr.length
  let currentLength = currentArr.length

  if (!oldLength && !currentLength) return []
  
  if (!oldLength) {
    oldArr = ['']
    oldLength = 1
  }
  if (!currentLength) {
    currentArr = ['']
    currentLength = 1
  }

  let longestLength = Math.max(oldLength, currentLength)
  
  let totalLength = oldLength + currentLength - 1
  
  oldArr = copy([...new Array(currentLength - 1).fill('~'), ...copy(oldArr)])
  
  for (let round = 0; round < totalLength; round++) {
    let diffArr = []
  
    for (let idx = 0; idx < totalLength + longestLength - 1; idx++) {
        let action = 'NONE'
        
        const old = oldArr[idx]?.value || oldArr[idx]
        const current = currentArr[idx]?.value || currentArr[idx]
  
        const meta = { ...(oldArr[idx]?.meta || {}), ...(currentArr[idx]?.meta || {}) }
        
        if (current === '~' && old === '~') action = 'UNUSED'
        else if (current === undefined && old === undefined) action = 'UNUSED'
        else if (current === '~' || !current && old) action = 'DELETE'
        else if (current && old === '~' || !old) action = 'INSERT'
        else if (current !== old) action = 'ALTER'
        
        diffArr[idx] = { idx, old, current, action, meta }
    }
    
    const noneObj = {
      noneLength: 0,
      noneIndex: Infinity,
    }
    
    const d = diffArr
      .filter(df => df.action !== 'UNUSED')
      .reduce((t, c) => {
        if (t.length < 1) return [c]
        
        if (t[t.length - 1].action === c.action) {
          if (c.action === 'NONE') return [...t, c]
          else return t
        } else return [...t, c]
      }, [])
      
    let current = 0
    let i = d.length
    
    for (; i > -1; i--) {
      const action = d[i]?.action
      const nextAction = d[i - 1]?.action
      
      if (action === 'NONE') {
        current++
        if (nextAction !== 'NONE') {
          if (current >= noneObj.noneLength) {
            noneObj.noneLength = current
            noneObj.noneIndex = i
          }
          
          current = 0
        }
      }
    }
    
    const payload = {
      oldArr: copy(oldArr),
      currentArr: copy(currentArr),
      diffArr,
      ...noneObj,
    }
    
    res.push(payload)
    
    currentArr.unshift('~')
  }
  
  console.log(res.map(r => r.diffArr.filter(d => d.action !== 'UNUSED').reduce((t, c) => {
      if (t.length < 1) return [c]
      
      if (t[t.length - 1].action === c.action) {
        if (c.action === 'NONE') return [...t, c]
        else return t
      } else return [...t, c]
    }, []).map(d => d.action[0]).join('')))
  
  if (!res.find(r => !!r.noneLength)) return finalFormat(res[currentLength - 1].diffArr)
  
  const selectedRes = res.reduce((selected, current) => {
    if (current.noneIndex < selected.noneIndex) return current
    else if (current.noneIndex === selected.noneIndex) {
      if (current.noneLength > selected.noneLength) return current
      else return selected
    } else return selected
  }, {
    noneLength: 0,
    noneIndex: Infinity,
  })
  
  console.log(selectedRes.diffArr.filter(d => d.action !== 'UNUSED').reduce((t, c) => {
      if (t.length < 1) return [c]
      
      if (t[t.length - 1].action === c.action) {
        if (c.action === 'NONE') return [...t, c]
        else return t
      } else return [...t, c]
    }, []).map(d => d.action[0]).join(''))

  let finalRes = []
  let latestIdx = 0
  
  for (const index in selectedRes.diffArr) {
    finalRes.push(selectedRes.diffArr[index])
    latestIdx = +index + 1
    
    if (selectedRes.diffArr[index].action === 'NONE' && selectedRes.diffArr[latestIdx]?.action !== 'NONE') break
  }
  
  finalRes = finalFormat(finalRes)
  
  if (selectedRes.noneLength) finalRes = [...finalRes, ...diffV1(selectedRes.oldArr.slice(latestIdx), selectedRes.currentArr.slice(latestIdx))]
  
  return finalRes
}

module.exports = diffV1
