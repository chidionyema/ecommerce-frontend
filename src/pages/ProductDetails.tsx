// src/pages/ProductDetails.tsx

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
    TextField,
    Snackbar,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Badge,
    ImageList,
    ImageListItem,
    Tooltip,
    Alert
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useBasket } from '../context/BasketContext';
import { useWishlist } from '../context/WishlistContext';
import Image from 'next/image';
import { Product , Review } from '../types/types';

const ProductDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { state: basketState, dispatch: basketDispatch } = useBasket();
    const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
    const [product, setProduct] = useState<Product | null>(null);
    const [reviewForm, setReviewForm] = useState({ user: '', comment: '', rating: 0 });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [basketOpen, setBasketOpen] = useState(false);
    const [mainImage, setMainImage] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const productData: Product = await response.json();
                setProduct(productData);
                setMainImage(productData.images[0]);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const addToBasket = (product: Product) => {
        if (!product.inStock) {
            setSnackbarMessage(`Sorry, ${product.name} is out of stock.`);
            setSnackbarSeverity('error');
        } else {
            basketDispatch({ type: 'ADD_TO_BASKET', product });
            setSnackbarMessage(`Added ${product.name} to basket`);
            setSnackbarSeverity('success');
        }
        setSnackbarOpen(true);
    };

    const addToWishlist = (product: Product) => {
        wishlistDispatch({ type: 'ADD_TO_WISHLIST', product });
        setSnackbarMessage(`Added ${product.name} to wishlist`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const removeFromWishlist = (id: string) => {
        wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', id });
        setSnackbarMessage(`Removed item from wishlist`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const handleReviewChange = (field: string, value: string | number) => {
        setReviewForm(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const submitReview = () => {
        if (!product) return;
        const newReview: Review = { ...reviewForm, rating: Number(reviewForm.rating) };
        setProduct(prevProduct =>
            prevProduct ? { ...prevProduct, reviews: [...(prevProduct.reviews || []), newReview] } : null
        );
        setSnackbarMessage(`Review added for ${product.name}`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setReviewForm({ user: '', comment: '', rating: 0 });
    };

    const toggleBasket = () => {
        setBasketOpen(!basketOpen);
    };

    const updateBasketQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            basketDispatch({ type: 'REMOVE_FROM_BASKET', id });
        } else {
            basketDispatch({ type: 'UPDATE_BASKET_QUANTITY', id, quantity });
        }
    };

    const handleCheckout = () => {
        const hasPhysicalProduct = basketState.items.some(item => item.type === 'physical');
        if (hasPhysicalProduct) {
            router.push('/checkout/shipping');
        } else {
            router.push('/checkout/payment');
        }
    };

    const totalPrice = basketState.items.reduce((total, item) => total + item.price * item.quantity, 0);

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: { xs: '1rem', sm: '2rem' } }}>
            <CssBaseline />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <IconButton onClick={() => router.back()} aria-label="Go back">
                    <ArrowBack />
                </IconButton>
                <Tooltip title="Open shopping basket">
                    <IconButton onClick={toggleBasket} aria-label="Open shopping basket">
                        <Badge badgeContent={basketState.items.reduce((total, item) => total + item.quantity, 0)} color="secondary">
                            <ShoppingCartIcon fontSize="large" />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Image
                            src={mainImage}
                            alt={product.name}
                            width={600}
                            height={400}
                            objectFit="cover"
                            layout="responsive"
                        />
                    </Card>
                    <ImageList cols={3} rowHeight={100} sx={{ mt: 2 }}>
                        {product.images.map((image, index) => (
                            <ImageListItem key={index} onClick={() => setMainImage(image)} sx={{ cursor: 'pointer' }}>
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                    sizes="(max-width: 600px) 100px, (max-width: 960px) 100px, 100px"
                                    loading="lazy"
                                    aria-hidden="true"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>{product.name}</Typography>
                    <Rating name="read-only" value={product.rating} readOnly />
                    <Typography variant="h6" color="primary" gutterBottom>${product.price.toFixed(2)}</Typography>
                    <Typography variant="body1" gutterBottom>{product.description}</Typography>
                    <Box display="flex" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<AddIcon />}
                            onClick={() => addToBasket(product)}
                            disabled={!product.inStock}
                            aria-label={product.inStock ? 'Add to basket' : 'Out of stock'}
                        >
                            {product.inStock ? 'Add to Basket' : 'Out of Stock'}
                        </Button>
                        <Tooltip title={wishlistState.items.some(item => item.id === product.id) ? 'Remove from wishlist' : 'Add to wishlist'}>
                            <IconButton
                                onClick={() => wishlistState.items.some(item => item.id === product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                                aria-label={wishlistState.items.some(item => item.id === product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                {wishlistState.items.some(item => item.id === product.id) ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {product.reviews && product.reviews.length > 0 && (
                        <Box mt={2}>
                            <Typography variant="subtitle1">Reviews:</Typography>
                            {product.reviews.map((review, index) => (
                                <Box key={index} mt={1}>
                                    <Typography variant="body2"><strong>{review.user}</strong>: {review.comment}</Typography>
                                    <Rating name="read-only" value={review.rating} readOnly size="small" />
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Box mt={2}>
                        <Typography variant="subtitle1">Add a Review:</Typography>
                        <TextField
                            label="User"
                            value={reviewForm.user}
                            onChange={(e) => handleReviewChange('user', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Comment"
                            value={reviewForm.comment}
                            onChange={(e) => handleReviewChange('comment', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <Rating
                            name="rating"
                            value={reviewForm.rating}
                            onChange={(e, newValue) => handleReviewChange('rating', newValue || 0)}
                            aria-labelledby="rating"
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={submitReview}
                            disabled={!reviewForm.user || !reviewForm.comment || !reviewForm.rating}
                            sx={{ mt: 1 }}
                            aria-label="Submit review"
                        >
                            Submit Review
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Drawer anchor="right" open={basketOpen} onClose={toggleBasket} aria-labelledby="shopping-basket">
                <Box sx={{ width: 350, padding: '1rem' }}>
                    <Typography variant="h6" gutterBottom id="shopping-basket">
                        Shopping Basket
                    </Typography>
                    <List>
                        {basketState.items.length === 0 ? (
                            <Typography variant="body1" color="text.secondary">
                                Your basket is empty
                            </Typography>
                        ) : (
                            basketState.items.map(item => (
                                <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Image
                                        src={item.images[0]} // Update this line to use the first image from the images array
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        objectFit="cover"
                                    />
                                    <ListItemText
                                        primary={
                                            <Box display="flex" alignItems="center">
                                                <IconButton onClick={() => updateBasketQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography variant="body1" sx={{ mx: 1 }}>{item.quantity}</Typography>
                                                <IconButton onClick={() => updateBasketQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        }
                                        secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                                    />
                                    <Tooltip title="Remove item">
                                        <IconButton edge="end" aria-label="delete" onClick={() => basketDispatch({ type: 'REMOVE_FROM_BASKET', id: item.id })}>
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
                            <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mt: 2 }}>
                                Proceed to Checkout
                            </Button>
                        )}
                    </Box>
                </Box>
            </Drawer>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductDetails;
