// src/pages/api/[[...path]].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';


export default async function handler(
  req: NextApiRequest | NextRequest,
  res?: NextApiResponse
) {
  try {
    // Check if we're using Node.js API routes (with req/res) or Edge API routes
    const isEdgeRuntime = !res;
    
    if (isEdgeRuntime) {
      return handleEdgeRequest(req as NextRequest);
    } else {
      return handleNodeRequest(req as NextApiRequest, res as NextApiResponse);
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
            : (error as Error).message 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Node.js runtime
      return res.status(500).json({ 
        error: 'Server Error',
        message: process.env.NODE_ENV === 'production' 
          ? 'An unexpected error occurred' 
          : (error as Error).message
      });
    }
  }
}

/**
 * Handle request in Edge Runtime
 */
async function handleEdgeRequest(req: NextRequest) {
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
  let body: Blob | null = null;
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
async function handleNodeRequest(req: NextApiRequest, res: NextApiResponse) {
  const path = req.url?.replace(/^\/api/, '') || '';
  
  // Configure the backend URL
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.yourbackend.com';
  const apiUrl = `${BACKEND_API_URL}${path}`;
  
  // Get client IP
  const ip = req.headers['x-forwarded-for'] || 
             req.socket.remoteAddress || 
             '127.0.0.1';
  
  // Create headers for the backend request
  const headers: Record<string, string> = { ...req.headers as Record<string, string> };
  
  // Skip some headers
  delete headers['host'];
  delete headers['connection'];
  delete headers['content-length'];
  
  // Add forwarded headers
  headers['X-Forwarded-For'] = Array.isArray(ip) ? ip[0] : ip as string;
  headers['X-Real-IP'] = Array.isArray(ip) ? ip[0] : ip as string;
  
  // Get request body for non-GET requests
  let body: string | null = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    // For Node.js API routes, req.body should already be parsed
    body = JSON.stringify(req.body);
    headers['Content-Type'] = 'application/json';
  }
  
  try {
    // Make the request to the backend
    const backendResponse = await fetch(apiUrl, {
      method: req.method || 'GET',
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
        : (error as Error).message
    });
  }
}