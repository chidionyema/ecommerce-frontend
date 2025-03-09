export async function onRequest(context) {
    // This re-routes all API requests to your Next.js API endpoints
    const url = new URL(context.request.url);
    
    // Extract the path that comes after /api/
    const path = url.pathname.replace(/^\/api/, '');
    
    // Create a new URL pointing to the appropriate Next.js API route
    const apiUrl = new URL(`/api${path}`, url.origin);
    
    // Forward the request to the Next.js API route
    return await fetch(apiUrl, context.request);
  }