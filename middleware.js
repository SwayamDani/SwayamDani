// middleware.js
import { NextResponse } from 'next/server'

const basicAuth = (req) => {
  const auth = req.headers.get('authorization')
  
  if (!auth) {
    return new Response('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }
  
  const [scheme, encoded] = auth.split(' ')
  const [user, pass] = atob(encoded).split(':')
  
  const validUser = user === process.env.STUDIO_USER
  const validPass = pass === process.env.STUDIO_PASS
  
  if (!validUser || !validPass) {
    return new Response('Access Denied', {
      status: 403,
    })
  }
  
  return NextResponse.next()
}

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/studio')) {
    return basicAuth(req)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'],
}