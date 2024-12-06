import bcryptjs from 'bcryptjs'

import db from '@/db'

import response from '@/utils/response'

export async function POST (request: Request) {
  try {
    const payload = await request.json()
    
    let user = await db.query('SELECT * FROM users WHERE username = $1', [payload.username])
    
    if (user.rows.length < 1) {
      return response({ err: 'Username is not registered, please ask admin to add it' })
    }
    
    if (user.rows[0].name) {
      return response({ err: 'Account already created for this username' })
    }
    
    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(payload.password, salt)

    await db.query('UPDATE users SET name = $1, password = $2 WHERE username = $3', [payload.name, password, payload.username])
    
    return response({})
  } catch (err) {
    console.error(err)
    
    return response({ err: 'Something is wrong when $1, please try again', errParams: ['Register']})
  }
}