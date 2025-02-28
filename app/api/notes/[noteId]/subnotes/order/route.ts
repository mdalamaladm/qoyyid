import { v4 as uuidV4 } from 'uuid'

import db from '@/db'

import { getDecodedToken } from '@/utils/token'
import response from '@/utils/response'

export async function GET(
  _: any,
  { params }: { params: { noteId: string }}
) {
  try {
    const { err } = await getDecodedToken()
  
    if (err) return response({ err })
    
    const noteId = (await params).noteId
    
    const res = await db.query(
      'SELECT subnotes.word_id, words.text, words.sequence, subnotes.text_id FROM words INNER JOIN subnotes ON words.id = subnotes.word_id WHERE words.note_id = $1 ORDER BY subnotes.text_id;', [noteId]
    )
    
    let sequences = []
    
    for (const index in res.rows) {
      const current = res.rows[index]
      const next = res.rows[+index + 1]
      
      let seqIdx = sequences.findIndex(s => s.textId === current.text_id)
      if (seqIdx < 0) sequences.push({
        textId: current.text_id,
        wordIds: [current.word_id],
        score: [current.sequence],
        lastNum: null,
        selected: [{ id: current.word_id, text: current.text, sequence: current.sequence }]
      })
      else {
        sequences[seqIdx].wordIds.push(current.word_id)
        sequences[seqIdx].score.push(current.sequence)
        sequences[seqIdx].selected.push({ id: current.word_id, text: current.text, sequence: current.sequence })
      }
      
      if (next?.text_id !== current.text_id) {
        if (seqIdx < 0) seqIdx = sequences.length - 1
  
        sequences[seqIdx].score.sort((a, b) => a - b)
        sequences[seqIdx].score = sequences[seqIdx].score.join('')
        
        sequences[seqIdx].lastNum = sequences[seqIdx].score.slice(-1)
      }
    }
    
    sequences.sort((a, b) => a.lastNum - b.lastNum || a.score - b.score)
    

    return response({ data: sequences })
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Load $1', ['Ta\'liqs']]] })
  }
}
