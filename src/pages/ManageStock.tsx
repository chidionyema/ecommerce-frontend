import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import ProductList from '../components/ProductList';
import { useRouter } from 'next/router';
import { Product } from '../types/types';

const ManageStock: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from an API or define them here
    // Example products
    const exampleProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 10.0,
        stock: 100,
        images: ['image1.jpg'],
        assets: [],
        description: 'Description of Product 1',
        rating: 4.5,
        new: true,
        categoryId: 'Category 1',
        brand: 'Brand 1',
        type: 'physical',
        inStock: true,
      },
      {
        id: '2',
        name: 'Product 2',
        price: 20.0,
        stock: 200,
        images: ['image2.jpg'],
        assets: [],
        description: 'Description of Product 2',
        rating: 4.0,
        new: false,
        categoryId: 'Category 2',
        brand: 'Brand 2',
        type: 'physical',
        inStock: true,
      },
      {
        id: '3',
        name: 'Product 3',
        price: 30.0,
        stock: 300,
        images: ['image3.jpg'],
        assets: [],
        description: 'Description of Product 3',
        rating: 5.0,
        new: false,
        categoryId: 'Category 3',
        brand: 'Brand 3',
        type: 'physical',
        inStock: true,
      },
    ];
    setProducts(exampleProducts);
  }, []);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Button variant="contained" color="primary" onClick={() => router.push('/add-product')}>
        Add New Product
      </Button>
      <ProductList products={products} />
    </Box>
  );
};

export default ManageStock;
