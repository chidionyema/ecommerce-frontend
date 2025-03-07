// src/pages/api/products/[id].ts
export const config = {
  runtime: 'experimental-edge'
};
import { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.haworks.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
    
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
        
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Product not found' });
      }
      throw new Error(`API error: ${response.status}`);
    }
        
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
}