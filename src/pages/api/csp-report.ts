// src/pages/api/csp-report.js
export const config = {
    runtime: 'edge',
  };
  
  export default async function handler(req: { method: string; json: () => any; }) {
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