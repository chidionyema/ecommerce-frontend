import React, { useState, useMemo, useCallback, useReducer } from 'react';
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
    Link,
    Slider,
    Tooltip,
    SelectChangeEvent
} from '@mui/material';
import { Alert } from '@mui/lab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { useBasket } from '../context/BasketContext';
import { useProduct } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import PaginationControls from '../components/PaginationControls';
import bannerConfig from '../config/bannerConfig'; // Adjust the path as needed
import { Product, BasketItem } from '../types/types';

const PAGE_SIZE = 6;

const SET_FILTER = 'SET_FILTER';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_PRICE_RANGE = 'SET_PRICE_RANGE';
const SET_BRAND = 'SET_BRAND';
const SET_SORT = 'SET_SORT';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_PAGE = 'SET_PAGE';
const TOGGLE_BASKET = 'TOGGLE_BASKET';
const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
const HIDE_SNACKBAR = 'HIDE_SNACKBAR';
const APPLY_COUPON = 'APPLY_COUPON';

const initialState = {
    filter: 'all',
    category: 'all',
    priceRange: [0, 1000],
    brand: 'all',
    sort: 'priceAsc',
    searchQuery: '',
    currentPage: 1,
    basketOpen: false,
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success' as 'success' | 'error',
    discount: 0,
};

function reducer(state: typeof initialState, action: { type: string; payload?: any }) {
    switch (action.type) {
        case SET_FILTER:
            return { ...state, filter: action.payload };
        case SET_CATEGORY:
            return { ...state, category: action.payload };
        case SET_PRICE_RANGE:
            return { ...state, priceRange: action.payload };
        case SET_BRAND:
            return { ...state, brand: action.payload };
        case SET_SORT:
            return { ...state, sort: action.payload };
        case SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload };
        case SET_PAGE:
            return { ...state, currentPage: action.payload };
        case TOGGLE_BASKET:
            return { ...state, basketOpen: !state.basketOpen };
        case SHOW_SNACKBAR:
            return {
                ...state,
                snackbarOpen: true,
                snackbarMessage: action.payload.message,
                snackbarSeverity: action.payload.severity,
            };
        case HIDE_SNACKBAR:
            return { ...state, snackbarOpen: false };
        case APPLY_COUPON:
            return { ...state, discount: action.payload.discount };
        default:
            return state;
    }
}

interface Banner {
    id: string;
    message: string;
    active: boolean;
    condition: () => boolean;
    imageUrl: string;
    gradient: string;
}

const Shop: React.FC = () => {
    const { state: productState } = useProduct();
    const { state: basketState, dispatch: basketDispatch } = useBasket();
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    const toggleBasket = () => dispatch({ type: TOGGLE_BASKET });

    const handleSnackbarClose = () => dispatch({ type: HIDE_SNACKBAR });

    const handleFilterChange = useCallback((event: SelectChangeEvent<string>) => {
        dispatch({ type: SET_FILTER, payload: event.target.value });
    }, []);

    const handleSortChange = useCallback((event: SelectChangeEvent<string>) => {
        dispatch({ type: SET_SORT, payload: event.target.value });
    }, []);

    const handleCategoryChange = useCallback((event: SelectChangeEvent<string>) => {
        dispatch({ type: SET_CATEGORY, payload: event.target.value });
    }, []);

    const handlePriceRangeChange = useCallback((event: Event, newValue: number | number[]) => {
        dispatch({ type: SET_PRICE_RANGE, payload: newValue });
    }, []);

    const handleBrandChange = useCallback((event: SelectChangeEvent<string>) => {
        dispatch({ type: SET_BRAND, payload: event.target.value });
    }, []);

    const handlePageChange = useCallback((page: number) => {
        dispatch({ type: SET_PAGE, payload: page });
    }, []);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: SET_SEARCH_QUERY, payload: event.target.value });
    }, []);

    const handleCheckout = () => {
        router.push('/checkout/shippingandpayment');
    };

    const handleGuestCheckout = () => {
        router.push('/checkout/guest');
    };

    const filteredProducts = useMemo(() => {
        return productState.products.filter((product: Product) => {
            if (state.filter !== 'all' && product.type !== state.filter) return false;
            if (state.category !== 'all' && product.category !== state.category) return false;
            if (state.brand !== 'all' && product.brand !== state.brand) return false;
            if (product.price < state.priceRange[0] || product.price > state.priceRange[1]) return false;
            if (!product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) &&
                !product.description.toLowerCase().includes(state.searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [productState.products, state]);

    const sortedProducts = useMemo(() => {
        return filteredProducts.sort((a: Product, b: Product) => {
            if (state.sort === 'priceAsc') return a.price - b.price;
            if (state.sort === 'priceDesc') return b.price - a.price;
            if (state.sort === 'rating') return b.rating - a.rating;
            return 0;
        });
    }, [filteredProducts, state.sort]);

    const paginatedProducts = useMemo(() => {
        return sortedProducts.slice((state.currentPage - 1) * PAGE_SIZE, state.currentPage * PAGE_SIZE);
    }, [sortedProducts, state.currentPage]);

    const updateBasketQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            basketDispatch({ type: 'REMOVE_FROM_BASKET', id });
        } else {
            basketDispatch({ type: 'UPDATE_BASKET_QUANTITY', id, quantity });
        }
    }, [basketDispatch]);

    const removeAllQuantities = useCallback((id: string) => {
        basketDispatch({ type: 'REMOVE_ALL_QUANTITY', id });
    }, [basketDispatch]);

    const totalPrice = useMemo(() => {
        return basketState.items.reduce((total: number, item: BasketItem) => total + item.price * item.quantity, 0);
    }, [basketState.items]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredProducts.length / PAGE_SIZE);
    }, [filteredProducts.length]);

    const activeBanners = useMemo(() => {
        return bannerConfig.filter((banner: Banner) => banner.active && banner.condition());
    }, []);

    return (
        <Box sx={{ padding: { xs: '1rem', sm: '2rem' } }}>
            <Head>
                <title>Shop</title>
                <meta name="description" content="Shop the best products online" />
                <meta name="keywords" content="shop, ecommerce, products, online store" />
            </Head>
            <CssBaseline />
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Typography color="textPrimary">Shop</Typography>
            </Breadcrumbs>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={3}>
                <Typography variant="h4" gutterBottom>
                    Shop
                </Typography>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        value={state.searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <IconButton aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        sx={{ minWidth: 200, mr: 2 }}
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2, mt: { xs: 2, sm: 0 } }}>
                        <InputLabel>Filter</InputLabel>
                        <Select value={state.filter} onChange={handleFilterChange} label="Filter">
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="physical">Physical</MenuItem>
                            <MenuItem value="digital">Digital</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2, mt: { xs: 2, sm: 0 } }}>
                        <InputLabel>Category</InputLabel>
                        <Select value={state.category} onChange={handleCategoryChange} label="Category">
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="apparel">Apparel</MenuItem>
                            <MenuItem value="home">Home</MenuItem>
                            {/* Add more categories as needed */}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2, mt: { xs: 2, sm: 0 } }}>
                        <InputLabel>Brand</InputLabel>
                        <Select value={state.brand} onChange={handleBrandChange} label="Brand">
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="brandA">Brand A</MenuItem>
                            <MenuItem value="brandB">Brand B</MenuItem>
                            {/* Add more brands as needed */}
                        </Select>
                    </FormControl>
                    <Box sx={{ minWidth: 200, mr: 2, mt: { xs: 2, sm: 0 } }}>
                        <Typography gutterBottom>Price Range</Typography>
                        <Slider
                            value={state.priceRange}
                            onChange={handlePriceRangeChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000}
                            aria-labelledby="price-range-slider"
                        />
                    </Box>
                    <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2, mt: { xs: 2, sm: 0 } }}>
                        <InputLabel>Sort</InputLabel>
                        <Select value={state.sort} onChange={handleSortChange} label="Sort">
                            <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                            <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                            <MenuItem value="rating">Rating</MenuItem>
                        </Select>
                    </FormControl>
                    <Tooltip title="Open shopping basket">
                        <IconButton onClick={toggleBasket} aria-label="Open shopping basket">
                            <Badge badgeContent={basketState.items.reduce((total: number, item: BasketItem) => total + item.quantity, 0)} color="secondary">
                                <ShoppingCartIcon fontSize="large" />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            {activeBanners.map((banner: Banner) => (
                <Box
                    key={banner.id}
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 1,
                        backgroundImage: `url(${banner.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        color: '#fff',
                        textAlign: 'center',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: banner.gradient,
                            borderRadius: 1,
                        }}
                    />
                    <Typography variant="h5" sx={{ position: 'relative', zIndex: 1 }}>
                        {banner.message}
                    </Typography>
                </Box>
            ))}
            <ProductList products={paginatedProducts} />
            <PaginationControls currentPage={state.currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <Drawer anchor="right" open={state.basketOpen} onClose={toggleBasket}>
                <Box sx={{ width: 350, padding: '1rem' }}>
                    <Typography variant="h6" gutterBottom>
                        Shopping Basket
                    </Typography>
                    <List>
                        {basketState.items.length === 0 ? (
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="20vh">
                                <Typography variant="body1" color="text.secondary">
                                    Your basket is empty
                                </Typography>
                                <Image
                                    src="/empty-basket.png"
                                    alt="Empty basket"
                                    width={150}
                                    height={150}
                                />
                            </Box>
                        ) : (
                            basketState.items.map((item: BasketItem) => (
                                <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        component="div"
                                        sx={{ width: '100px', height: '100px', marginRight: '1rem', position: 'relative' }}
                                    >
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            layout="fill"
                                            objectFit="cover"
                                            sizes="(max-width: 600px) 100px, (max-width: 960px) 100px, 100px"
                                            loading="lazy"
                                            aria-hidden="true"
                                        />
                                    </Box>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={
                                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                                <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                                                <Typography variant="body2">Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
                                            </Box>
                                        }
                                    />
                                    <Box display="flex" alignItems="center">
                                        <IconButton onClick={() => updateBasketQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography variant="body1" sx={{ mx: 1 }}>{item.quantity}</Typography>
                                        <IconButton onClick={() => updateBasketQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                    <Tooltip title="Remove all quantities">
                                        <IconButton edge="end" aria-label="Remove from basket" onClick={() => removeAllQuantities(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            ))
                        )}
                    </List>
                    <Divider />
                    <Box sx={{ padding: '1rem' }}>
                        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
                        {basketState.items.length > 0 && (
                            <Box display="flex" flexDirection="column" gap={1}>
                                <Button variant="contained" color="primary" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </Button>
                                <Button variant="outlined" color="primary" onClick={handleGuestCheckout}>
                                    Guest Checkout
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Drawer>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={state.snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={state.snackbarSeverity}>
                    {state.snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Shop;
