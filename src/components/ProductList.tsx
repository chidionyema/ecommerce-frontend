// src/components/ProductList.tsx
import React from 'react';
import { Grid, Box } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types/types';
import { styled } from '@mui/system';

// Styled container for Product List
const StyledContainer = styled(Box)({
  padding: '20px',
  marginTop: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '15px',
  boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.1)',
});

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <StyledContainer>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default ProductList;