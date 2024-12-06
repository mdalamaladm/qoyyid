import Markdown from './index'
import cases from './cases'

console.log('========== MARKDOWN V1 ==========')

let success = 0

for (const c of cases) {
  const res = Markdown.generate(c.text)

  if (res === c.expected) {
    success++
    console.log(`
${c.name} [SUCCESS] \u2705
Result: ${res}
    `)
  } else console.log(`
${c.name} [FAILED] \u274c
Expected: ${c.expected}
Result  : ${res}
  `)

  console.log('=================================')
}

console.log(`
CASES SUCCEED: ${success}/${cases.length}
`)