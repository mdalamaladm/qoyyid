const diff = require('./index')
const data = require('./data')

console.time('diffV1')
console.log('=== Start diffV1 ===')

if (!process.argv[2]?.startsWith('v')) throw Error('Version must be specified')

const version = process.argv[2].replace('v', '')

const testFormat = (arr) => arr.reduce((text, e) => `${text} ${e.action === 'DELETE' ? `<${e.old}>` : e.action === 'ALTER' ? `[${e.old} => ${e.current}]` : e.action === 'INSERT' ? `(${e.current})` : e.current}`, '').trim()

console.log('==========')

let success = 0
let failed = 0

for (const d of data) {
  const old = Array.isArray(d.old) ? d.old : d.old.trim().split(/\s{1,}|\t/g)
  const current = Array.isArray(d.current) ? d.current : d.current.trim().split(/\s{1,}|\t/g)
  
  const resRaw = diff[`diffV${version}`](old, current)
  
  const res = testFormat(resRaw)
  
  const resRawConsole = resRaw.find(rr => rr.meta ? !!Object.keys(rr.meta) : false) ? `Raw Result: ${JSON.stringify(resRaw)}` : ''

  if (res === d.expected) {
    console.log(`
      ${d.name} [SUCCESS] \u2705
      Result: ${res}
      ${resRawConsole}
    `)
    success++
  } else {
    console.log(`
      ${d.name} [FAILED] \u274c
      Expected: ${d.expected}
      Result  : ${res}
      ${resRawConsole}
    `)
    failed++
  }

  console.log('==========')
}

console.timeEnd('diffV1')
console.log('=== End diffV1 ===')
console.log(`TEST PASSED: ${success}/${data.length}`)