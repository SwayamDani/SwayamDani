import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const basicAuth = (req: NextRequest) => {
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

export function middleware(req: NextRequest) {
  // For debugging - inspect request hostname and path
  console.log('Middleware running for:', req.nextUrl.pathname);
  console.log('Request hostname:', req.headers.get('host'));
  console.log('Request URL:', req.url);
  
  // Handle blog route restriction to only localhost:3000
  if (req.nextUrl.pathname.startsWith('/blog')) {
    const hostname = req.headers.get('host');
    
    // More robust check - ensure it's exactly localhost:3000
    if (hostname !== 'localhost:3000' && !req.url.includes('localhost:3000')) {
      console.log(`Blocking access to ${req.nextUrl.pathname} from ${hostname}`);
      
      // Redirect to the homepage instead of showing the blog
      return NextResponse.redirect(new URL('/not_found', req.url));
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