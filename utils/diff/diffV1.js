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
  let res = []
  let oldArr = copy(oldArrParam)
  let currentArr = copy(currentArrParam)
  
  console.log('OLD ARR', oldArr)
  console.log('CURRENT ARR', currentArr)
  
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
    
    let current = 0
    let i = diffArr.length
    for (; i > -1; i--) {
      const action = diffArr[i]?.action
      const nextAction = diffArr[i - 1]?.action
      
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
    const deleteLength = diffArr.filter(d => d.action === 'DELETE').length
    const insertLength = diffArr.filter(d => d.action === 'INSERT').length
    // console.log(oldArr)
    // console.log(currentArr)
    console.log({ ...noneObj, deleteLength, insertLength })
    console.log('-----')
    
    const payload = {
      oldArr: copy(oldArr),
      currentArr: copy(currentArr),
      diffArr,
      ...noneObj,
      deleteLength,
      insertLength,
    }
    
    res.push(payload)
    
    currentArr.unshift('~')
  }
  
  console.log(res.map(r => r.diffArr.map(d => d.action[0]).join('')))
  
  if (!res.find(r => !!r.noneLength)) return finalFormat(res[currentLength - 1].diffArr)
  
  const selectedRes = res.reduce((selected, current) => {
    if (current.noneIndex < selected.noneIndex) {
      return current
      if (current.insertLength < selected.insertLength && current.noneLength >= selected.noneLength) return current
      else return selected
    } else if (current.noneIndex === selected.noneIndex) {
      if (current.noneLength >= selected.noneLength && current.deleteLength < selected.deleteLength ) return current
      else return selected
    } else return selected
  }, {
    noneLength: 0,
    noneIndex: Infinity,
    deleteLength: Infinity,
  })
  
  console.log(selectedRes.diffArr.map(d => d.action[0]).join(''))
  console.log('=======')

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
