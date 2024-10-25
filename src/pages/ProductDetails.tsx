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
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
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
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state: basketState, dispatch: basketDispatch } = useBasket();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { state: productState, dispatch: productDispatch, fetchProducts } = useProduct();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mainImage, setMainImage] = useState<string>('');
  const [recentBuyer, setRecentBuyer] = useState('');
  const [liveNotification, setLiveNotification] = useState(false);

  useEffect(() => {
    // Fetch products if not already loaded in the context
    if (!productState.products.length) {
      fetchProducts();
    }
    // Set the main image based on the product id from the URL
    const existingProduct = productState.products.find((p) => p.id === id);
    if (existingProduct) {
      setMainImage(existingProduct.images ? existingProduct.images[0] : '');
    }
  }, [id, productState.products, fetchProducts]);

  const product = productState.products.find((p) => p.id === id);

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
        <Grid item xs={12} md={6}>
          {mainImage && (
            <CardMedia
              component="img"
              height="500"
              image={mainImage}
              alt={product.name}
              sx={{ objectFit: 'contain', borderRadius: 2 }}
            />
          )}
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h6" color="primary" gutterBottom>${product.price.toFixed(2)}</Typography>
          <Rating name="read-only" value={product.rating} readOnly />
          <Typography variant="body1" color="text.secondary" gutterBottom>{product.description}</Typography>

          <StyledButton variant="contained" endIcon={<AddIcon />} onClick={() => addToBasket(product)} disabled={!product.inStock}>
            {product.inStock ? 'Add to Basket' : 'Out of Stock'}
          </StyledButton>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </Grid>
      </Grid>
    </DetailsContainer>
  );
};

export default ProductDetails;
