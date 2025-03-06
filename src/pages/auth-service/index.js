import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Auth Service API Route
 * Acts as a proxy to the backend .NET API authentication endpoints
 * 
 * @param {NextApiRequest} req - The Next.js API request
 * @param {NextApiResponse} res - The Next.js API response
 */
async function authService(req, res) {
  // Only allow specific methods
  const allowedMethods = ['GET', 'POST', 'OPTIONS'];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  try {
    // Get the backend API URL from environment variables
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.yourbackend.com';
    const authEndpoint = `${backendUrl}/auth${req.url.split('auth-service')[1] || ''}`;

    // Prepare headers for the backend request
    const headers = {
      'Content-Type': 'application/json',
    };

    // Forward authorization header if present
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    // Forward the request to the backend
    const response = await fetch(authEndpoint, {
      method: req.method,
      headers,
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    // Get response data
    const data = await response.json().catch(() => ({}));

    // Forward the response from the backend
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Auth service error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : error.message 
    });
  }
}

export default authService;