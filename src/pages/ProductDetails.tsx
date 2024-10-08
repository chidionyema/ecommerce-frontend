import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Card,
  Rating,
  Snackbar,
  CssBaseline,
  Drawer,
  Badge,
  ImageList,
  ImageListItem,
  Tooltip,
  CardMedia,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useBasket } from '../context/BasketContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types/types';
import { useProduct } from '../context/ProductContext';

const DetailsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f9fafb',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const StyledCard = styled(Card)({
  boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '20px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)',
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: '30px',
  textTransform: 'uppercase',
  fontWeight: 700,
  fontSize: '1rem',
  padding: '12px 24px',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0px 10px 20px rgba(41, 128, 185, 0.2)',
  },
}));

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state: basketState, dispatch: basketDispatch } = useBasket();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { state: productState, dispatch: productDispatch } = useProduct();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const productData: Product = await response.json();
        productDispatch({ type: 'ADD_PRODUCT', product: productData });
        setMainImage(productData.images ? productData.images[0] : '');
      } catch (error) {
        console.error(error);
      }
    };

    const existingProduct = productState.products.find((p) => p.id === id);
    if (existingProduct) {
      setMainImage(existingProduct.images ? existingProduct.images[0] : '');
    } else if (id) {
      fetchProduct();
    }
  }, [id, productState.products, productDispatch]);

  const addToBasket = (product: Product) => {
    if (!product.inStock) {
      setSnackbarMessage(`Sorry, ${product.name} is out of stock.`);
    } else {
      basketDispatch({ type: 'ADD_TO_BASKET', product });
      setSnackbarMessage(`Added ${product.name} to basket`);
    }
    setSnackbarOpen(true);
  };

  const addToWishlist = (product: Product) => {
    wishlistDispatch({ type: 'ADD_TO_WISHLIST', product });
    setSnackbarMessage(`Added ${product.name} to wishlist`);
    setSnackbarOpen(true);
  };

  const removeFromWishlist = (id: string) => {
    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', id });
    setSnackbarMessage(`Removed item from wishlist`);
    setSnackbarOpen(true);
  };

  const product = productState.products.find((p) => p.id === id);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <DetailsContainer>
      <CssBaseline />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <IconButton onClick={() => router.back()} aria-label="Go back">
          <ArrowBack fontSize="large" />
        </IconButton>
        <Tooltip title="Open shopping basket">
          <IconButton aria-label="Open shopping basket">
            <Badge badgeContent={basketState.items.reduce((total, item) => total + item.quantity, 0)} color="secondary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={4}>
        {/* Product Image and Thumbnails */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            {mainImage && (
              <CardMedia
                component="img"
                height="500"
                image={mainImage}
                alt={product.name}
                sx={{ objectFit: 'contain', borderRadius: 2 }}
              />
            )}
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Rating name="read-only" value={product.rating} readOnly />
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {product.description}
              </Typography>
            </CardContent>
          </StyledCard>
          <ImageList cols={4} rowHeight={100} sx={{ mt: 3 }}>
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <ImageListItem key={index} onClick={() => setMainImage(image)} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                  <CardMedia component="img" image={image} alt={`Thumbnail ${index}`} sx={{ borderRadius: 2 }} />
                </ImageListItem>
              ))
            ) : (
              <Typography variant="body2">No images available</Typography>
            )}
          </ImageList>
        </Grid>

        {/* Product Details and Actions */}
        <Grid item xs={12} md={6}>
          <StyledButton variant="contained" endIcon={<AddIcon />} onClick={() => addToBasket(product)} disabled={!product.inStock}>
            {product.inStock ? 'Add to Basket' : 'Out of Stock'}
          </StyledButton>
          <Tooltip title={wishlistState.items.some((item) => item.id === product.id) ? 'Remove from wishlist' : 'Add to wishlist'}>
            <IconButton
              onClick={() =>
                wishlistState.items.some((item) => item.id === product.id)
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
              aria-label="wishlist toggle"
            >
              {wishlistState.items.some((item) => item.id === product.id) ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={snackbarMessage}
      />
    </DetailsContainer>
  );
};

export default ProductDetails;
