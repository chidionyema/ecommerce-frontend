// File: middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (not authentication required)
  const isPublicPath = 
    path === '/login' || 
    path === '/register' || 
    path === '/forgot-password' || 
    path === '/reset-password' || 
    path.startsWith('/api/auth') || 
    path.startsWith('/_next') || 
    path.startsWith('/static') || 
    path.includes('.') || // For static files like images
    path === '/';

  // Get token from next-auth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If the user is not logged in and trying to access a protected route
  if (!token && !isPublicPath) {
    // Save the original path to redirect back after login
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // If the user is logged in and trying to access a public route like login
  if (token && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is trying to access subscription content without a subscription
  const isSubscriptionPath = path.startsWith('/premium');
  if (token && isSubscriptionPath && !token.isSubscribed) {
    return NextResponse.redirect(new URL('/subscription', request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  // Matcher ignoring _next, api/auth and static files like images
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)'],
};