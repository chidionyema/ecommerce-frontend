// src/middleware.js
import { NextResponse } from 'next/server';

// Basic security headers function
function applySecurityHeaders(response) {
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
    (isProduction ? 'https://api.ritualworks.com' : 'https://api.local.ritualworks.com');
  
  // CSP headers
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' ${!isProduction ? "'unsafe-inline' 'unsafe-eval'" : ''} ` +
      "https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
    `style-src 'self' ${!isProduction ? "'unsafe-inline'" : ''} https://fonts.googleapis.com`,
    "img-src 'self' data: https://*.stripe.com https://www.google.com/recaptcha/",
    `connect-src 'self' ${apiUrl} ${!isProduction ? "http://localhost:3000 ws://localhost:3000" : ''} ` +
      "https://checkout.stripe.com https://api.ritualworks.com",
    "frame-src 'self' https://js.stripe.com https://www.google.com/recaptcha/ https://stripe.com",
    "font-src 'self' https://fonts.gstatic.com",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ];

  response.headers.set(
    'Content-Security-Policy',
    cspDirectives.join('; ').replace(/\s+/g, ' ').trim()
  );

  return response;
}

// Simple rate limiting implementation for Edge Runtime
const ipRateLimits = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100; // Limit each IP to 100 requests per windowMs
  
  if (!ipRateLimits.has(ip)) {
    ipRateLimits.set(ip, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }
  
  const rateLimitInfo = ipRateLimits.get(ip);
  
  // Reset if the window has passed
  if (now > rateLimitInfo.resetTime) {
    rateLimitInfo.count = 1;
    rateLimitInfo.resetTime = now + windowMs;
    ipRateLimits.set(ip, rateLimitInfo);
    return true;
  }
  
  // Increment count
  rateLimitInfo.count += 1;
  ipRateLimits.set(ip, rateLimitInfo);
  
  // Return false if rate limit exceeded
  if (rateLimitInfo.count > maxRequests) {
    return false;
  }
  
  return true;
}

// Main middleware function
export async function middleware(request) {
  // Get client IP
  const ip = request.headers.get('cf-connecting-ip') || 
             request.headers.get('x-forwarded-for') || 
             '127.0.0.1';
  
  // Apply rate limiting
  if (!checkRateLimit(ip)) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests, please try again later' }),
      { 
        status: 429, 
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '900' // 15 minutes in seconds
        }
      }
    );
  }
  
  // Input validation
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

// Configure which paths this middleware runs on
export const config = {
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