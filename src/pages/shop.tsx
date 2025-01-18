import React, { useState, useEffect, useRef } from 'react';

// Importing individual components directly from @mui/material
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent directly


import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Importing external libraries
import { motion } from 'framer-motion';
import Carousel from 'react-material-ui-carousel';

import axios from 'axios';

// Importing Redux utilities
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { RootState } from '../store';

// Importing types
import { Product, Category } from '../types/types';

// Importing Next.js utilities
import { useRouter } from 'next/router';


const PAGE_SIZE = 9;

const Shop: React.FC = () => {
  // State Variables
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loaderRef = useRef<HTMLDivElement>(null);

  // Redux and Router
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  // ================================
  // Data Fetching
  // ================================
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get<Product[]>('https://api.local.ritualworks.com/api/products', {
          params: {
            page,
            pageSize: PAGE_SIZE,
            search: searchQuery,
            category: selectedCategory,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
          },
        });
        const newProducts: Product[] = response.data; // Adjust based on API structure

        // Append new products to the existing list
        setDisplayedProducts((prev) => [...prev, ...newProducts]);

        // Determine if more products are available
        if (newProducts.length < PAGE_SIZE) setHasMore(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setErrorMessage('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchProducts();
  }, [page, searchQuery, selectedCategory, priceRange]);

  // Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://api.local.ritualworks.com/api/category');
        setCategories(response.data); // Adjust based on API structure
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setErrorMessage('Failed to load categories. Please try again later.');
      }
    };
    fetchCategories();
  }, []);

  // ================================
  // Infinite Scroll Setup
  // ================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, hasMore, isLoading]);

  // ================================
  // Handlers
  // ================================
  const resetFilters = () => {
    setPage(1);
    setDisplayedProducts([]);
    setHasMore(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    resetFilters();
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setSelectedCategory(event.target.value);
    resetFilters();
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    resetFilters();
  };

  const handleQuickViewOpen = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleQuickViewClose = () => setQuickViewOpen(false);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addItem({
        productid: product.id,
        name: product.name,
        quantity: 1,
        unitPrice: product.unitPrice,
      })
    );
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleViewDetails = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  // ================================
  // Render
  // ================================
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <CssBaseline />

      {/* ====== AppBar & Search ====== */}
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Browse Products
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              disabled={isLoading} // Disable during loading
              sx={{
                width: { xs: '250px', sm: '400px' },
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: 1,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ====== Main Container ====== */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Select
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
            displayEmpty
            sx={{ width: 200 }}
            disabled={isLoading} // Disable during loading
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>

          <Box sx={{ width: 300 }}>
            <Typography variant="caption">Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              disabled={isLoading} // Disable during loading
            />
          </Box>
        </Box>

        {/* ====== Product Grid ====== */}
        <Grid container spacing={3}>
          {/* Initial Loading Skeletons */}
          {isLoading && !displayedProducts.length
            ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" height={300} animation="wave" />
                  <Skeleton variant="text" height={30} animation="wave" />
                  <Skeleton variant="text" height={20} animation="wave" />
                </Grid>
              ))
            : displayedProducts.map((product) => {
                const bannerText = product.headline || 'Amazing Course';

                return (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <motion.div
                      whileHover={{ translateY: -3 }} // Slight "lift" on hover
                      style={{ height: '100%' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          backgroundColor: '#fff',
                          borderRadius: '15px',
                          boxShadow: '0 2px 12px rgba(173, 80, 180, 0.1)',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            boxShadow: '0 4px 16px rgba(173, 80, 180, 0.15)',
                          },
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* ====== Banner with headline ====== */}
                        <Box
                          sx={{
                            background: 'linear-gradient(90deg, #AB47BC, #F06292)',
                            color: '#fff',
                            py: 2, // Increase vertical padding for a bigger banner
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {bannerText}
                          </Typography>
                        </Box>

                        {/* Top Image Section */}
                        <Box
                          sx={{
                            height: 140, // Slightly smaller image height to balance bigger banner
                            backgroundImage: `url(${product.contents[0]?.url || '/placeholder.png'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        {/* If the product is new, show a small chip in the top-left corner */}
                        {product.new && (
                          <Chip
                            label="New"
                            sx={{
                              position: 'absolute',
                              top: 90, // slightly below the banner
                              left: 16,
                              bgcolor: '#AB47BC', // purple accent
                              color: '#fff',
                              fontWeight: 'bold',
                              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            }}
                          />
                        )}

                        {/* Product Content Section */}
                        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {product.shortDescription}
                          </Typography>

                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}
                          >
                            ${product.unitPrice.toFixed(2)}
                          </Typography>

                          {/* Rating Section */}
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            {[...Array(5)].map((_, index) => (
                              <StarIcon
                                key={index}
                                fontSize="small"
                                sx={{
                                  color: index < product.rating ? '#FFB400' : 'rgba(0,0,0,0.2)',
                                }}
                              />
                            ))}
                          </Box>

                          {/* Author + Brand */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              mb: 2,
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {product.authorAvatarUrl && (
                                <Avatar
                                  src={product.authorAvatarUrl}
                                  alt={product.authorName || 'Author'}
                                  sx={{ width: 32, height: 32 }}
                                />
                              )}
                              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                {product.authorName
                                  ? `by ${product.authorName}`
                                  : 'No author info'}
                              </Typography>
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: 'bold', color: '#AB47BC' }}
                            >
                              Glustack
                            </Typography>
                          </Box>

                          {/* Actions */}
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mt: 'auto', // push actions to bottom if needed
                            }}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ textTransform: 'none', fontWeight: 600 }}
                              onClick={() => handleQuickViewOpen(product)}
                            >
                              Quick View
                            </Button>
                            <IconButton
                              onClick={() => handleViewDetails(product.id)}
                              sx={{
                                border: '1px solid rgba(0,0,0,0.2)',
                                '&:hover': {
                                  backgroundColor: 'rgba(0,0,0,0.05)',
                                },
                              }}
                            >
                              <ArrowForwardIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                );
              })}
        </Grid>

        {/* Loader */}
        <Box ref={loaderRef} sx={{ height: '50px', textAlign: 'center', mt: 2 }}>
          {isLoading && hasMore ? (
            <CircularProgress />
          ) : hasMore ? (
            <Typography variant="body2" color="text.secondary">
              Scroll down to load more...
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No more products to show.
            </Typography>
          )}
        </Box>
      </Container>

      {/* ====== Quick View Dialog ====== */}
      {quickViewProduct && (
        <Dialog
          open={quickViewOpen}
          onClose={handleQuickViewClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>{quickViewProduct.name}</DialogTitle>
          <DialogContent>
            <Carousel>
              {quickViewProduct.contents.map((content) => (
                <img
                  key={content.id}
                  src={content.url}
                  alt={quickViewProduct.name}
                  style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                />
              ))}
            </Carousel>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {quickViewProduct.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h6">
                ${quickViewProduct.unitPrice.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(quickViewProduct)}
              >
                Add to Cart
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* ====== Snackbar Notifications ====== */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Added to cart!
        </Alert>
      </Snackbar>

      {/* ====== Error Snackbar ====== */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setErrorMessage('')} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Shop;
