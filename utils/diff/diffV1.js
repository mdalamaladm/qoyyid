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
  // alert("OLD PARAM " + p(oldArrParam))
  // alert("CURRENT PARAM " + p(currentArrParam))
  
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
  
  // alert("WITH ~: " + p(oldArr))
  
  for (let round = 0; round < totalLength; round++) {
    // console.log(oldArr)
    // console.log(currentArr)

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
    
   // console.log(diffArr)
    // console.log('======')
    
    const payload = {
      oldArr: copy(oldArr),
      currentArr: copy(currentArr),
      diffArr,
      noneLength: diffArr.filter(d => d.action === 'NONE').length,
      firstNoneIdx: diffArr.find(d => d.action === 'NONE')?.idx || Infinity
    }
    
    res.push(payload)
    
    currentArr.unshift('~')
  }
  
  
  if (!res.find(r => !!r.noneLength)) return finalFormat(res[currentLength - 1].diffArr)
  
  const selectedRes = res.reduce((selected, current) => {
    if (
      //!!current.noneLength &&
      current.noneLength > selected.noneLength
      && current.firstNoneIdx < selected.firstNoneIdx
      ) return current
    else return selected
  })

  let finalRes = []
  let latestIdx = 0
  
  for (const index in selectedRes.diffArr) {
    finalRes.push(selectedRes.diffArr[index])
    latestIdx = +index + 1
    
    if (selectedRes.diffArr[index].action === 'NONE' && selectedRes.diffArr[latestIdx].action !== 'NONE') break
  }
  
  // console.log('LATEST INDEX', latestIdx)
  // console.log('SELECTED OLD ARR', selectedRes.oldArr)
  // console.log('SELECTED CURR ARR', selectedRes.currentArr)
  
  // console.log('*******')
  // alert("FINAL RES " + p(finalRes))
  
  finalRes = finalFormat(finalRes)
  
  if (selectedRes.noneLength) finalRes = [...finalRes, ...diffV1(selectedRes.oldArr.slice(latestIdx), selectedRes.currentArr.slice(latestIdx))]
  
  return finalRes
}

module.exports = diffV1
