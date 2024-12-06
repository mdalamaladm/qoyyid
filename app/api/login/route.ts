import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import { cookies } from 'next/headers'

import db from '@/db'

import response from '@/utils/response'

import { User } from '@/@types/auth.d'

const JWT_SECRET = process.env.NEXT_JWT_SECRET ?? ''

export async function POST (request: Request) {
  try {
    const payload = await request.json()
  
    let user: User | any = await db.query('SELECT * FROM users WHERE username = $1', [payload.username])
    
    if (user.rows.length < 1) {
      return response({ err: 'Invalid username or password' })
    }
    
    user = user.rows[0] as User
    
    const isPasswordEmpty = !user.password
    
    if (isPasswordEmpty) {
      return response({ err: 'Invalid username or password' })
    }
    
    const isMatching = bcryptjs.compareSync(payload.password, user.password)
    
    if (!isMatching) {
      return response({ err: 'Invalid username or password' })
    }
    
    const token = jwt.sign({
      data: { id: user.id, name: user.name, username: user.username }
    }, JWT_SECRET, { expiresIn: '1h' })
    
    cookies().set('token', token, { expires: Date.now() + 60 * 60 * 1000 })
    
    return response({ data: { name: user.name }})
  
  } catch (err) {
    console.error(err)
  
    return response({ err: 'Something is wrong when $1, please try again', errParams: ['Login']})
  }
}