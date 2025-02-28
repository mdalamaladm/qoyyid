import { cookies } from 'next/headers'

import response from '@/utils/response'

export async function POST (request: Request) {
  try {
    (await cookies()).delete('token')
    
    return response({})
  } catch (err) {
    console.error(err)
  
    return response({ err: 'Something is wrong when $1, please try again', errParams: ['Logout']})
  }
}