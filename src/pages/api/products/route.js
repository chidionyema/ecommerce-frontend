// File: app/api/products/route.js
export const runtime = 'edge';
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.haworks.com';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('pageSize') || 10;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let url = `${API_BASE_URL}/api/products?page=${page}&pageSize=${pageSize}`;
  
  if (category) url += `&category=${encodeURIComponent(category)}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
