import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { cookies } from 'next/headers'
 
export function middleware(request: NextRequest) {
  const token = cookies().get('token')
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/_next') || pathname.startsWith('/assets') || pathname.startsWith('/api') || pathname === '/favicon.ico') return NextResponse.next()
  
  if (!token?.value && pathname !== '/login' && pathname !== '/register') return NextResponse.redirect(new URL('/login', request.url))
  
  if (token?.value && !pathname.startsWith('/notes')) return NextResponse.redirect(new URL('/notes', request.url))
  
  NextResponse.next()
}
