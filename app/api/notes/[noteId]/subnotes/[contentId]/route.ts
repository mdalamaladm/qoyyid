import { v4 as uuidV4 } from 'uuid'

import db from '@/db'

import { getDecodedToken } from '@/utils/token'
import response from '@/utils/response'

export async function GET(
  _: any,
  { params }: { params: { wordId: string }}
) {
  try {
    const { err } = getDecodedToken()
  
    if (err) return response({ err })
    
    const id = params.wordId
    
    const res = await db.query(
      'SELECT * FROM subnotes WHERE word_id = $1', [id]
    )
  
    return response({ data: res.rows[0] })
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Load $1', ['Subnotes']]] })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { noteId: string, wordId: string }}
) {
  try {
    const { data, err } = getDecodedToken()
  
    if (err) return response({ err })
    
    const id = uuidV4()
    const noteId = params.noteId
    const wordId = params.wordId
    
    const payload = await request.json()
    const text = payload.text
  
    await db.query(
      'INSERT INTO subnotes VALUES($1, $2, $3, $4) ON CONFLICT (word_id) DO NOTHING', [id, noteId, wordId, text]
    )
  
    return response({})
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Add $1', ['Subnotes']]] })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { wordId: string }}
) {
  try {
    const { data, err } = getDecodedToken()
  
    if (err) return response({ err })

    const wordId = params.wordId
    
    const payload = await request.json()
    const text = payload.text
  
    if (text) await db.query(
      'UPDATE subnotes SET text = $1 WHERE word_id = $2', [text, wordId]
    )
    else await db.query(
      'DELETE FROM subnotes WHERE word_id = $1', [wordId]
    )
  
    return response({})
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Edit $1', ['Subnotes']]] })
  }
}
