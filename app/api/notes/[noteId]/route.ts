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
  
    const resNotes = await db.query(
      'SELECT * FROM notes WHERE id = $1', [noteId]
    )
    
    const resWords = await db.query(
      'SELECT * FROM words WHERE note_id = $1 ORDER BY sequence ASC', [noteId]
    )
    
    const data = {
      note: resNotes.rows[0] || null,
      words: resWords.rows || []
    }
  
    return response({ data })
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Load $1', ['Notes']]] })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { noteId: string }}
) {
  const client = await db.connect()

  try {
    const { err } = getDecodedToken()
  
    if (err) return response({ err })
    
    const noteId = params.noteId
    
    const payload = await request.json()
    const title = payload?.title || ''
    const content = payload?.content || ''
    const words = payload?.words || []
    
    await client.query('BEGIN')

    await client.query(
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3', [title, content, noteId]
    )
    
    for (const index in words) {
      const word = words[index]

      if (word.action === 'INSERT') {
        const wordId = uuidV4()
        
        await client.query('INSERT INTO words VALUES ($1, $2, $3, $4)', [wordId, noteId, word.current, +index + 1])
      } else if (word.action === 'ALTER') {
        await client.query('UPDATE words SET text = $1 WHERE id = $2', [word.current, word.meta.id])
      } else if (word.action === 'DELETE') {
        await client.query('DELETE FROM words WHERE id = $1', [word.meta.id])
        
        await client.query(`DELETE FROM subnotes WHERE word_id LIKE '%${word.meta.id}%'`)
      }
      
      if (word.meta?.id) await client.query('UPDATE words SET sequence = $1 WHERE id = $2', [+index + 1, word.meta.id])
    }
  
    await client.query('COMMIT')
  
    return response({})
  } catch (err) {
    console.error(err)
    
    await client.query('ROLLBACK')
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Edit $1', ['Notes']]] })
  } finally {
    client.release()
  }
}

export async function DELETE(
  _: any,
  { params }: { params: { noteId: string }}
) {
  try {
    const { err } = getDecodedToken()
  
    if (err) return response({ err })
  
    const noteId = params.noteId
  
    const res = await db.query(
      'DELETE FROM notes WHERE id = $1', [noteId]
    )
  
    return response({})
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Remove $1', ['Notes']]] })
  }
}