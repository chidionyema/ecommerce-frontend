// src/components/ProductCard.tsx

import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Box, Button, Typography, IconButton } from '@mui/material';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useRouter } from 'next/router';
import { useBasket } from '../context/BasketContext';
import { useWishlist } from '../context/WishlistContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product, BasketItem } from '../types/types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    const { dispatch: basketDispatch } = useBasket();
    const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

    const addToBasket = () => {
        if (!product.inStock) {
            // Handle out of stock case
        } else {
            const basketItem: BasketItem = {
                ...product,
                quantity: 1
            };
            basketDispatch({ type: 'ADD_TO_BASKET', product: basketItem });
        }
    };

    const addToWishlist = () => {
        wishlistDispatch({ type: 'ADD_TO_WISHLIST', product });
    };

    const removeFromWishlist = () => {
        wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', id: product.id });
    };

    const navigateToDetails = () => {
        router.push(`/ProductDetails?id=${product.id}`);
    };

    return (
        <Card>
            <CardActionArea onClick={navigateToDetails}>
                <Zoom>
                    <CardMedia
                        component="img"
                        height="200"
                        image={product.images[0]} // Use the first image from the images array
                        alt={product.name}
                        style={{ cursor: 'pointer' }}
                    />
                </Zoom>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        ${product.price.toFixed(2)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Box sx={{ textAlign: 'center', padding: '1rem' }}>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowRightAlt />}
                    onClick={addToBasket}
                    disabled={!product.inStock}
                >
                    {product.inStock ? 'Add to Basket' : 'Out of Stock'}
                </Button>
                <IconButton onClick={() => wishlistState.items.some(item => item.id === product.id) ? removeFromWishlist() : addToWishlist()}>
                    {wishlistState.items.some(item => item.id === product.id) ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>
        </Card>
    );
};

export default ProductCard;


