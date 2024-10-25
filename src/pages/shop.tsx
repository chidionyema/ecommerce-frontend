import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  CssBaseline,
  TextField,
  Breadcrumbs,
  Link as MuiLink,
  Slider,
  Grid,
  InputAdornment,
  Chip,
  Container,
  Paper,
} from '@mui/material';
import { Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { useBasket } from '../context/BasketContext';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard'; // Create a new component for product cards
import PaginationControls from '../components/PaginationControls';
import { motion } from 'framer-motion';

const PAGE_SIZE = 9;

const Shop: React.FC = () => {
  const { state: productState } = useProduct();
  const { state: basketState, dispatch: basketDispatch } = useBasket();
  const router = useRouter();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sort, setSort] = useState('priceAsc');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [basketOpen, setBasketOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const toggleBasket = () => setBasketOpen(!basketOpen);
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const toggleFilterDrawer = () => setFilterDrawerOpen(!filterDrawerOpen);

  const handleSortChange = (event: any) => setSort(event.target.value);
  const handlePriceRangeChange = (event: any, newValue: number | number[]) => setPriceRange(newValue as number[]);
  const handleSearchChange = (event: any) => setSearchQuery(event.target.value);
  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const categories = useMemo(() => {
    const uniqueCategories = new Set(productState.products.map((product) => product.categoryId));
    return Array.from(uniqueCategories);
  }, [productState.products]);

  const filteredProducts = useMemo(() => {
    return productState.products.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.categoryId)
      )
        return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (!product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [productState.products, selectedCategories, priceRange, searchQuery]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (sort === 'nameAsc') return a.name.localeCompare(b.name);
      if (sort === 'nameDesc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [filteredProducts, sort]);

  const paginatedProducts = useMemo(() => {
    return sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  }, [sortedProducts, currentPage]);

  const updateBasketQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      basketDispatch({ type: 'REMOVE_FROM_BASKET', id });
    } else {
      basketDispatch({ type: 'UPDATE_BASKET_QUANTITY', id, quantity });
    }
  };

  const totalPrice = useMemo(() => {
    return basketState.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [basketState.items]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / PAGE_SIZE);
  }, [filteredProducts.length]);

  return (
    <Box sx={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Head>
        <title>Shop - Explore Our Products</title>
        <meta name="description" content="Shop the best products online" />
        <meta name="keywords" content="shop, ecommerce, products, online store" />
      </Head>
      <CssBaseline />
      {/* Top Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          py: 2,
          px: { xs: 2, sm: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Shop
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: { xs: '100px', sm: '200px' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={toggleFilterDrawer} aria-label="Open filters">
            <FilterListIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={toggleBasket} aria-label="Open shopping basket">
            <Badge
              badgeContent={basketState.items.reduce((total, item) => total + item.quantity, 0)}
              color="secondary"
            >
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Product Grid */}
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} basketDispatch={basketDispatch} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      </Container>

      {/* Filter Drawer */}
      <Drawer anchor="left" open={filterDrawerOpen} onClose={toggleFilterDrawer}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Categories */}
          <Typography variant="subtitle1" gutterBottom>
            Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                color={selectedCategories.includes(category) ? 'primary' : 'default'}
                onClick={() => handleCategoryToggle(category)}
              />
            ))}
          </Box>

          {/* Price Range */}
          <Typography variant="subtitle1" gutterBottom>
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={{ mb: 4 }}
          />

          {/* Sort */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={handleSortChange} label="Sort By">
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
              <MenuItem value="nameAsc">Name: A to Z</MenuItem>
              <MenuItem value="nameDesc">Name: Z to A</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" fullWidth onClick={toggleFilterDrawer}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Basket Drawer */}
      <Drawer anchor="right" open={basketOpen} onClose={toggleBasket}>
        <Box sx={{ width: { xs: 300, sm: 400 }, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Shopping Basket
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {basketState.items.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                Your basket is empty
              </Typography>
            ) : (
              basketState.items.map((item) => (
                <ListItem key={item.id} sx={{ alignItems: 'flex-start', py: 2 }}>
                  <Image
                    src={item.images?.[0] || '/placeholder.png'}
                    alt={item.name}
                    width={80}
                    height={80}
                    style={{ borderRadius: '8px', marginRight: '16px' }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Price: £{item.price}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <IconButton
                            aria-label="decrease quantity"
                            onClick={() => updateBasketQuantity(item.id, item.quantity - 1)}
                            size="small"
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body2" sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            aria-label="increase quantity"
                            onClick={() => updateBasketQuantity(item.id, item.quantity + 1)}
                            size="small"
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            aria-label="remove item"
                            onClick={() => basketDispatch({ type: 'REMOVE_FROM_BASKET', id: item.id })}
                            size="small"
                            sx={{ ml: 2 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              ))
            )}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Total: £{totalPrice.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => router.push('/checkout/shippingandpayment')}
          >
            Checkout
          </Button>
        </Box>
      </Drawer>

      {/* Snackbar for feedback */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Shop;
