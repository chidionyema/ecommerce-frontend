// pages/api/products/[id].js
// Platform-agnostic API route using Pages Router format

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.haworks.com';

export default async function handler(req, res) {
  // Get the ID from the URL parameter
  const { id } = req.query;
  
  // Only allow GET requests (or implement other methods as needed)
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `The ${req.method} method is not supported for this route`
    });
  }
  
  try {
    // Fetch the product from your API
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        // Add any authorization headers needed
        ...(process.env.API_KEY && { 'Authorization': `Bearer ${process.env.API_KEY}` })
      },
    });
    
    // Handle response status
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ 
          error: 'Not found',
          message: 'Product not found' 
        });
      }
      
      throw new Error(`API error: ${response.status}`);
    }
    
    // Return the data
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch product details' 
    });
  }
}