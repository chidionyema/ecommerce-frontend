// src/middleware.js
import { NextResponse } from 'next/server';

// Specify NodeJS runtime instead of Edge
export const config = {
  runtime: 'nodejs',
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

// Basic security headers function
function applySecurityHeaders(response) {
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Hardcoded values for Cloudflare Edge compatibility
  const apiUrl = 'https://api.ritualworks.com';
  
  // Simplified CSP header for Cloudflare
  const cspHeader = "default-src 'self'; " +
    "script-src 'self' https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https://*.stripe.com https://www.google.com/recaptcha/; " +
    "connect-src 'self' " + apiUrl + " https://checkout.stripe.com; " +
    "frame-src 'self' https://js.stripe.com https://www.google.com/recaptcha/ https://stripe.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'";

  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

// For NodeJS runtime, we can use a more efficient approach
// This is a basic approximation - true rate limiting requires external storage
function checkRateLimit(ip) {
  // In NodeJS runtime without persistence between requests
  // This is mostly a placeholder for when you implement a proper
  // solution using an external service
  return true;
}

// Main middleware function
export default async function middleware(request) {
  // Get client IP
  const ip = request.headers.get('cf-connecting-ip') || 
             request.headers.get('x-forwarded-for') || 
             '127.0.0.1';
  
  // Apply basic path validation
  const path = request.nextUrl.pathname;
  if (path.includes('../') || path.includes('..\\')) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid request path' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  // Continue with the request
  const response = NextResponse.next();
  
  // Apply security headers
  return applySecurityHeaders(response);
}