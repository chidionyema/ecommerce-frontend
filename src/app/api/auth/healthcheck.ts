// File: pages/api/auth/healthcheck.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type HealthResponse = {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  environment: string;
  version?: string;
  uptime?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // Basic health response
  const healthResponse: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.APP_VERSION || '1.0.0'
  };

  // Set cache headers to prevent caching
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).json(healthResponse);
}