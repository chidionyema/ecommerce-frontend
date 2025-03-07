// src/pages/api/csp-report.ts
export const config = {
    runtime: 'edge'
  };

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// Use default Node.js runtime for now to troubleshoot
// export const config = {
//   runtime: '  edge',
// };

export default async function handler(
  req: NextApiRequest | NextRequest,
  res?: NextApiResponse
) {
  // Check if we're using Node.js API routes (with req/res) or Edge API routes
  const isEdgeRuntime = !res;
  
  if (isEdgeRuntime) {
    return handleEdgeRequest(req as NextRequest);
  } else {
    return handleNodeRequest(req as NextApiRequest, res as NextApiResponse);
  }
}

/**
 * Handle request in Edge Runtime
 */
async function handleEdgeRequest(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Allow': 'POST'
        }
      }
    );
  }
  
  try {
    // Get the report data
    const reportData = await req.json();
    
    // In production, you would log this to a monitoring service
    console.warn('CSP Violation:', JSON.stringify(reportData));
    
    return new Response(
      JSON.stringify({ received: true }),
      {
        status: 204,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error processing CSP report:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to process report' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

/**
 * Handle request in Node.js Runtime
 */
async function handleNodeRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get the report data from req.body
    const reportData = req.body;
    
    // In production, you would log this to a monitoring service
    console.warn('CSP Violation:', JSON.stringify(reportData));
    
    return res.status(204).json({ received: true });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    return res.status(400).json({ error: 'Failed to process report' });
  }
}