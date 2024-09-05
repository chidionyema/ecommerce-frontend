import React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
    const { state, dispatch } = useProduct();
    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDelete = (id: string) => {
        dispatch({ type: 'DELETE_PRODUCT', id });
        // Call API to delete product
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <Grid container spacing={2}>
                {state.products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Box>
                            <img src={product.images[0]} alt={product.name} style={{ width: '100%' }} />
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography>{product.description}</Typography>
                            <Typography>${product.price}</Typography>
                            <Typography>Stock: {product.stock}</Typography>
                            <IconButton onClick={() => handleEdit(product.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(product.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;
