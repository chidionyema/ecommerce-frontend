// components/ProductCard.jsx
import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ProductCard = ({ product, basketDispatch }) => {
  const router = useRouter();

  const addToBasket = () => {
    basketDispatch({ type: 'ADD_TO_BASKET', product });
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card
        sx={{
          cursor: 'pointer',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
          <Image
            src={product.images?.[0] || '/placeholder.png'}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" noWrap>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
            £{product.price.toFixed(2)}
          </Typography>
          <Button variant="contained" color="secondary" fullWidth onClick={addToBasket}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
