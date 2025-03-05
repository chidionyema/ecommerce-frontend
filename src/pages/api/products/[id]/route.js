export async function GET(request, { params }) {
    const { id } = params;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          );
        }
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
      );
    }
  }