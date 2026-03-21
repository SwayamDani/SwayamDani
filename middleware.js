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
  
  const parts = auth.split(' ')
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'basic') {
    return new Response('Auth Required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    })
  }
  const [user, pass] = atob(parts[1]).split(':')
  
  const validUser = user === process.env.STUDIO_USER
  const validPass = pass === process.env.STUDIO_PASS
  
  if (!validUser || !validPass) {
    return new Response('Access Denied', {
      status: 403,
    })
  }
  
  return NextResponse.next()
}

export default function middleware(req) {
  // Handle blog route restriction to only localhost:3000
  if (req.nextUrl.pathname.startsWith('/blog')) {
    const hostname = req.headers.get('host');

    // Only allow localhost:3000, block all other domains including localhost with other ports
    if (hostname !== 'localhost:3000') {
      
      // Return 403 Forbidden response with a clear message
      return new Response('Access Denied: This page is only accessible from localhost:3000', {
        status: 403,
      });
    }
  }
  
  // Handle studio authentication
  if (req.nextUrl.pathname.startsWith('/studio')) {
    return basicAuth(req)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*', '/blog/:path*'],
}