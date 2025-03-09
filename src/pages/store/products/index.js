// pages/api/products/index.js
// Platform-agnostic API route using Pages Router format

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.haworks.com';

export default async function handler(req, res) {
  // Only allow GET requests (or implement other methods as needed)
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `The ${req.method} method is not supported for this route`
    });
  }
  
  // Get query parameters
  const { 
    page = 1, 
    pageSize = 10, 
    category, 
    search,
    minPrice,
    maxPrice,
    sort = 'newest' 
  } = req.query;
  
  // Build the API URL with query parameters
  let url = new URL(`${API_BASE_URL}/api/products`);
  
  // Add query parameters
  url.searchParams.append('page', page);
  url.searchParams.append('pageSize', pageSize);
  
  if (category) url.searchParams.append('category', category);
  if (search) url.searchParams.append('search', search);
  if (minPrice) url.searchParams.append('minPrice', minPrice);
  if (maxPrice) url.searchParams.append('maxPrice', maxPrice);
  if (sort) url.searchParams.append('sort', sort);
  
  try {
    // Fetch the products from your API
    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        // Add any authorization headers needed
        ...(process.env.API_KEY && { 'Authorization': `Bearer ${process.env.API_KEY}` })
      },
    });
    
    // Handle response status
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Return the data
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch products'
    });
  }
}