import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useProduct } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const ProductsList: React.FC = () => {
  const { state, dispatch } = useProduct();
  const { products, totalProducts } = state;
  const [error, setError] = React.useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(9);
  const totalPages = Math.ceil(totalProducts / pageSize);

  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Load initial products if needed, or assume they are loaded in context
  }, []);

  const handleEdit = (productId: string) => {
    router.push(`/edit-product?id=${productId}`);
  };

  const handleDelete = (productId: string) => {
    if (!isAuthenticated) {
      alert('You do not have permission to delete products.');
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      try {
        dispatch({ type: 'DELETE_PRODUCT', id: productId });
        setSuccessMessage('Product deleted successfully!');
        setSnackbarOpen(true);
      } catch (error) {
        setError('Failed to delete product.');
      }
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {products.slice((page - 1) * pageSize, page * pageSize).map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product?.images?.[0] || '/default-image.png'} // Ensure images is defined and has elements
                alt={product.name || 'Product Image'}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price.toFixed(2)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Tooltip title="Edit Product">
                    <IconButton color="primary" onClick={() => handleEdit(product.id)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Product">
                    <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductsList;
