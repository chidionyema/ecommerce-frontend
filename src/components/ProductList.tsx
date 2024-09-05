// src/components/ProductList.tsx
import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types/types';


interface ProductListProps {
    products: Product[];
  }

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <Grid container spacing={3}>
            {products.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
