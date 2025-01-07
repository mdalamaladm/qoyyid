import { NextRequest } from 'next/server'

import { v4 as uuidV4 } from 'uuid'

import db from '@/db'

import { getDecodedToken } from '@/utils/token'
import response from '@/utils/response'

export async function GET(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  try {
    const { err } = getDecodedToken()
  
    if (err) return response({ err })
    
    let wordIds = req.nextUrl.searchParams.get('wordIds')
    
    if (!wordIds) return response({})
    
    wordIds = wordIds.split(',')

    const res = await db.query(
      `SELECT text_id FROM subnotes WHERE ${wordIds.map(wId => `word_id = '${wId}'`).join(' OR ')}`
    )

    for (const { text_id } of res.rows) {
      const res2 = await db.query(
        `SELECT word_id FROM subnotes WHERE text_id = $1`, [text_id]
      )
      const count = res2.rowCount
      const isAllThere = wordIds.reduce((isThere, current) => isThere && !!(res2.rows.find(r => r.word_id === current)), true)
      
      // If all Word Ids is in that Text Id and total of Word Ids in Text Id is same exact as Word Ids from the request, then that's the targeted Text Id
      if (isAllThere && count === wordIds.length) {
        const textRes = await db.query(
          `SELECT * FROM texts WHERE id = $1`, [text_id]
        )
        
        return response({ data: textRes.rows[0] })
      }
    }
  
    return response({ data: { text: '' } })
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Load $1', ['Subnotes']]] })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  const client = await db.connect()

  try {
    const { data, err } = getDecodedToken()
  
    if (err) return response({ err })
    
    const payload = await request.json()
    const noteId = params.noteId
    const text = payload.text
    const textId = uuidV4()
    const wordIds = payload.wordIds
    
    await client.query('BEGIN')
    
    await client.query(
      'INSERT INTO texts VALUES($1, $2, $3)', [textId, noteId, text]
    )
  
    for (const wId of wordIds) await client.query(
      'INSERT INTO subnotes VALUES($1, $2)', [wId, textId]
    )
    
    await client.query('COMMIT')
  
    return response({})
  } catch (err) {
    console.error(err)
    
    await client.query('ROLLBACK')
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Add $1', ['Subnotes']]] })
  } finally {
    client.release()
  }
}

export async function PUT(
  request: Request,
) {
  try {
    const { data, err } = getDecodedToken()
  
    if (err) return response({ err })

    const payload = await request.json()
    const text = payload.text
    const textId = payload.textId
    const wordIds = payload.wordIds
  
    if (text) await db.query(
      'UPDATE texts SET text = $1 WHERE id = $2', [text, textId]
    )
    else await db.query(
      `DELETE FROM subnotes WHERE ${wordIds.map(wId => `word_id = '${wId}'`).join(' AND ')}`
    )
  
    return response({})
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Edit $1', ['Subnotes']]] })
  }
}
