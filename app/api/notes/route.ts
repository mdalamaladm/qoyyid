import { v4 as uuidV4 } from 'uuid'

import db from '@/db'

import { getDecodedToken } from '@/utils/token'
import { getURLParams } from '@/utils/url'
import response from '@/utils/response'

export async function GET() {
  try {
    const { data, err } = await getDecodedToken()
  
    if (err) return response({ err })

    const res = await db.query(
      'SELECT * FROM notes WHERE user_id = $1', [data.id]
    )
    
    let d = res.rows.map((current) => {
      let formatted = current.content || ''
      formatted = formatted.replace(/\*\*/g, '')
      formatted = formatted.replace(/__/g, '')
      formatted = formatted.replace(/\\n/g, '')
      
      current.content = formatted
      
      return current
    })
  
    return response({ data: d })
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Load $1', ['Notes']]] })
  }
}

export async function POST() {
  try {
    const { data, err } = await getDecodedToken()
  
    if (err) return response({ err })
    
    const id = uuidV4()
    const userId = data.id
  
    const res = await db.query(
      'INSERT INTO notes VALUES($1, $2, $3)', [id, userId, '']
    )
  
    return response({ data: { id }})
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: [['Add $1', ['Notes']]] })
  }
}
