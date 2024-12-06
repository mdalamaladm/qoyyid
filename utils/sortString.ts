let res = ['0']
    
for (let i = 1; i < 100; i++) {
  const tempRes = [...res]
  for (const r of tempRes) {
    res.push(r + '' + i)
  }
}

res = res.map(r => r.substring(1))
res.shift()

console.log(res)