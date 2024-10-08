// src/components/ProductCard.tsx
import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
import { useBasket } from '../context/BasketContext';
import { useWishlist } from '../context/WishlistContext';
import { Product, BasketItem } from '../types/types';

// Styled components for a modern, aesthetic look
const StyledCard = styled(Card)({
  borderRadius: '15px',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
  },
});

const StyledCardContent = styled(CardContent)({
  padding: '16px',
  backgroundColor: '#ffffff',
});

const PriceTypography = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#ff4d4f',
  marginTop: '16px',
});

const AddToCartButton = styled(Button)({
  borderRadius: '30px',
  textTransform: 'uppercase',
  fontWeight: 600,
  padding: '10px 20px',
  backgroundColor: '#ff6b6b',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#ff4d4f',
  },
});

const WishlistButton = styled(IconButton)({
  color: '#ff4d4f',
  '&:hover': {
    color: '#ff6b6b',
    transform: 'scale(1.2)',
  },
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
  zIndex: 1,
  transition: 'opacity 0.4s ease',
  opacity: 0,
  '&:hover': {
    opacity: 1,
  },
});

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  const { dispatch: basketDispatch } = useBasket();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const addToBasket = () => {
    if (!product.inStock) return;
    const basketItem: BasketItem = { ...product, quantity: 1 };
    basketDispatch({ type: 'ADD_TO_BASKET', product: basketItem });
  };

  const toggleWishlist = () => {
    if (wishlistState.items.some(item => item.id === product.id)) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', id: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', product });
    }
  };

  const navigateToDetails = () => {
    router.push(`/ProductDetails?id=${product.id}`);
  };

  const productImage = product.images?.[0] || '/default-image.png'; // Use default image as fallback

  return (
    <StyledCard>
      <CardActionArea onClick={navigateToDetails}>
        <Zoom>
          <CardMedia
            component="img"
            height="200"
            image={productImage}
            alt={product.name}
            sx={{ objectFit: 'cover', filter: 'brightness(0.85)' }}
          />
        </Zoom>
        <Overlay />
      </CardActionArea>
      <StyledCardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
        <PriceTypography>${product.price.toFixed(2)}</PriceTypography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
          <Tooltip title="Add to Wishlist" arrow>
            <WishlistButton onClick={toggleWishlist}>
              {wishlistState.items.some(item => item.id === product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </WishlistButton>
          </Tooltip>
          <AddToCartButton
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={addToBasket}
            disabled={!product.inStock}
            sx={{ marginLeft: '16px' }}
          >
            {product.inStock ? 'Add to Basket' : 'Out of Stock'}
          </AddToCartButton>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ProductCard;