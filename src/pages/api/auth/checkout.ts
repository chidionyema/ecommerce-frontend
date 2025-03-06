// pages/api/auth/checkout.ts
import type { NextRequest } from 'next/server';

// Add this line to specify Edge Runtime
export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Parse the request body
    const data = await req.json();
    
    // Handle checkout logic here
    // Note: Edge Runtime has limitations on available Node.js APIs
    
    // Example response
    return new Response(JSON.stringify({ 
      success: true,
      orderId: 'order_' + Math.random().toString(36).substring(2, 15)
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Checkout failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}