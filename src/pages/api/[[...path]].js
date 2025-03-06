// src/pages/api/[[...path]].js

// Use default Node.js runtime for now to troubleshoot
// You can re-enable edge runtime after fixing the issue
// export const config = {
//   runtime: 'edge',
// };

/**
 * Main API handler that proxies requests to the backend
 */
export default async function handler(req, res) {
    try {
      // Check if we're using Node.js API routes (with req/res) or Edge API routes
      const isEdgeRuntime = !res;
      
      if (isEdgeRuntime) {
        return handleEdgeRequest(req);
      } else {
        return handleNodeRequest(req, res);
      }
    } catch (error) {
      console.error('API Handler Error:', error);
      
      if (!res) {
        // Edge runtime
        return new Response(
          JSON.stringify({ 
            error: 'Server Error', 
            message: process.env.NODE_ENV === 'production' 
              ? 'An unexpected error occurred' 
              : error.message 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        // Node.js runtime
        return res.status(500).json({ 
          error: 'Server Error',
          message: process.env.NODE_ENV === 'production' 
            ? 'An unexpected error occurred' 
            : error.message
        });
      }
    }
  }
  
  /**
   * Handle request in Edge Runtime
   */
  async function handleEdgeRequest(req) {
    if (!req.url) {
      console.error('Edge request missing URL');
      return new Response(
        JSON.stringify({ error: 'Invalid request: URL is undefined' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/api/, '');
    
    // Configure the backend URL
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.yourbackend.com';
    const apiUrl = `${BACKEND_API_URL}${path}`;
    
    // Get client IP
    const ip = req.headers.get('cf-connecting-ip') || 
               req.headers.get('x-forwarded-for') || 
               '127.0.0.1';
    
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
  }
  
  /**
   * Handle request in Node.js Runtime
   */
  async function handleNodeRequest(req, res) {
    const path = req.url.replace(/^\/api/, '');
    
    // Configure the backend URL
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.yourbackend.com';
    const apiUrl = `${BACKEND_API_URL}${path}`;
    
    // Get client IP
    const ip = req.headers['x-forwarded-for'] || 
               req.connection.remoteAddress || 
               '127.0.0.1';
    
    // Create headers for the backend request
    const headers = { ...req.headers };
    
    // Skip some headers
    delete headers['host'];
    delete headers['connection'];
    delete headers['content-length'];
    
    // Add forwarded headers
    headers['X-Forwarded-For'] = ip;
    headers['X-Real-IP'] = ip;
    
    // Get request body for non-GET requests
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // For Node.js API routes, req.body should already be parsed
      body = JSON.stringify(req.body);
      headers['Content-Type'] = 'application/json';
    }
    
    try {
      // Make the request to the backend
      const backendResponse = await fetch(apiUrl, {
        method: req.method,
        headers,
        body,
        redirect: 'follow',
      });
      
      // Get the response data
      const data = await backendResponse.text();
      const contentType = backendResponse.headers.get('content-type') || '';
      
      // Set response status
      res.status(backendResponse.status);
      
      // Copy response headers
      for (const [key, value] of backendResponse.headers.entries()) {
        res.setHeader(key, value);
      }
      
      // Send the response
      if (contentType.includes('application/json')) {
        return res.json(JSON.parse(data));
      } else {
        return res.send(data);
      }
    } catch (error) {
      console.error('Proxy Error:', error);
      return res.status(500).json({ 
        error: 'Proxy Error',
        message: process.env.NODE_ENV === 'production' 
          ? 'An unexpected error occurred' 
          : error.message
      });
    }
  }