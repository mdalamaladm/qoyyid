import { v4 as uuidV4 } from 'uuid'

import db from '@/db'

import { getDecodedToken } from '@/utils/token'
import response from '@/utils/response'

export async function GET(
  _: any,
  { params }: { params: { noteId: string }}
) {
  try {
    const { err } = getDecodedToken()
  
    if (err) return response({ err })
    
    const noteId = params.noteId
    
    const resContents = await db.query(
      'SELECT * FROM words WHERE note_id = $1', [noteId]
    )
    
    const sequences = resContents.rows.reduce((mapped, current) => ({
      ...mapped,
      [current.id]: current.sequence
    }), {})
  
    const res = await db.query(
      'SELECT * FROM subnotes WHERE note_id = $1', [noteId]
    )
    
    const ordered = res.rows.map(r => ({
      ...r,
      score: r.word_id.split('|').map(ci => sequences[ci]).join(''),
      lastNum: sequences[r.word_id.split('|').slice(-1)[0]]
    }))
    
    ordered.sort((a, b) => a.lastNum - b.lastNum || a.score - b.score)

    return response({ data: ordered })
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Load $1', ['Ta\'liqs']]] })
  }
}
