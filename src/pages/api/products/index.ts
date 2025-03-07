// src/pages/api/products/index.ts
export const config = {
  runtime: '  edge'
};
import { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.haworks.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Type for query parameters
  const { 
    page = 1, 
    pageSize = 10, 
    category, 
    search 
  } = req.query;
  
  let url = `${API_BASE_URL}/api/products?page=${page}&pageSize=${pageSize}`;
  
  if (category) url += `&category=${encodeURIComponent(String(category))}`;
  if (search) url += `&search=${encodeURIComponent(String(search))}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}