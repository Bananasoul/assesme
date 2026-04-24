import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // Check if we are trying to access the practitioner area
  if (request.nextUrl.pathname.startsWith('/practitioner')) {
    // Allow access to the login page itself
    if (request.nextUrl.pathname === '/practitioner/login') {
      return NextResponse.next();
    }

    // Check for the auth cookie
    const authCookie = request.cookies.get('kine-auth');
    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/practitioner/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/practitioner/:path*', '/practitioner'],
};
