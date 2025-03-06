// src/pages/api/[[...path]].js
// API Proxy to replace Express functionality in server.js

export const config = {
    runtime: 'edge',
  };
  
  /**
   * Main API handler that proxies requests to the backend
   */
  export default async function handler(req) {
    const { pathname } = new URL(req.url);
    const path = pathname.replace(/^\/api/, ''); // Remove /api prefix
    
    // Configure the backend URL
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.yourbackend.com';
    const apiUrl = `${BACKEND_API_URL}${path}`;
    
    // Get client IP
    const ip = req.headers.get('cf-connecting-ip') || 
               req.headers.get('x-forwarded-for') || 
               '127.0.0.1';
    
    try {
      // Create headers for the backend request
      const headers = new Headers();
      
      // Copy original headers
      for (const [key, value] of req.headers.entries()) {
        // Skip some headers that will be set by fetch
        if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
          headers.set(key, value);
        }
      }
      
      // Add forwarded headers
      headers.set('X-Forwarded-For', ip);
      headers.set('X-Real-IP', ip);
      
      // Get request body for non-GET requests
      let body = null;
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        // Check body size
        const contentLength = req.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > 10240) { // 10KB limit
          return new Response(
            JSON.stringify({ error: 'Request entity too large' }),
            { status: 413, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        // Get the body
        body = await req.blob();
      }
      
      // Make the request to the backend
      const backendResponse = await fetch(apiUrl, {
        method: req.method,
        headers,
        body,
        redirect: 'follow',
      });
      
      // Clone the response to modify it
      const responseHeaders = new Headers(backendResponse.headers);
      
      // Return the proxied response
      return new Response(backendResponse.body, {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      // Log the error (in production, use a logging service)
      console.error('API Proxy Error:', error);
      
      // Return an error response
      return new Response(
        JSON.stringify({ 
          error: 'Proxy Error', 
          message: process.env.NODE_ENV === 'production' 
            ? 'An unexpected error occurred' 
            : error.message 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }