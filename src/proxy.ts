import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    
    // Decode base64 to get username and password
    const [user, pwd] = atob(authValue).split(':');

    // The requested password is "*kieron#"
    // We check both user and pwd in case it's accidentally typed in the username field
    if (pwd === '*kieron#' || user === '*kieron#') {
      return NextResponse.next();
    }
  }

  // If no auth provided or wrong password, show the browser's native password prompt
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="Secure Area"`,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
