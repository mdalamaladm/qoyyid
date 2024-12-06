import { cookies } from 'next/headers'
 
import jwt from 'jsonwebtoken'

import { Token, TokenVerbose } from '@/@types/token.d'

const JWT_SECRET = process.env.NEXT_JWT_SECRET ?? ''

export const decode = (token: string) => {
  let decode: TokenVerbose | Token | null = null
  
  try {
    decode = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    console.error(err)

    return { err: 'Please login again' }
  }

  if (!decode) return { err: 'Please login again' }
  
  return { data: decode }
}

export const getDecodedToken = (verbose?: boolean) => {
  const token = cookies().get('token')
    
  if (!token?.value) return { err: 'Please login again' }
  
  let { data, err }:  { data?: TokenVerbose | Token, err?: string } = decode(token.value)
  
  if (err) {
    cookies().delete('token')
    
    return { err }
  }
  
  if (!verbose) data = data?.data
  
  return { data }
}