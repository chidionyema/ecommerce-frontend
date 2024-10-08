// src/components/AddListing.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Snackbar,
  Alert,
  Tooltip,
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import axios from 'axios';
import { Product } from '../types/types';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import { useRouter } from 'next/router';

interface Category {
  id: string;
  name: string;
}

interface AddListingProps {
  productId?: string;
}

const steps = ['Basic Information', 'Category Selection', 'Upload Images', 'Upload Assets', 'Review and Submit'];

const initialProductState: Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: '',
  images: [], // This will hold the image files
  assets: [], // This will hold the asset files
  rating: 0,
  new: true,
  brand: '',
  type: 'physical',
  inStock: true,
  reviews: [],
};

const AddListing: React.FC<AddListingProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product>(initialProductState);
  const [imageFiles, setImageFiles] = useState<File[]>([]); // New state to hold image files
  const [assetFiles, setAssetFiles] = useState<File[]>([]); // New state to hold asset files
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false);

  const { user, isAuthenticated } = useAuth();
  const { state: productState, addProduct, updateProduct } = useProduct();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://api.local.ritualworks.com/api/Products/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Failed to fetch categories. Please try again.');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (productId) {
      const existingProduct = productState.products.find((p) => p.id === productId);
      if (existingProduct) {
        setProduct(existingProduct);
      } else {
        setError('Product not found.');
      }
    }
  }, [productId, productState.products]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    const value = e.target.value as string;
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: value,
    }));
  };

  const onDrop = (acceptedFiles: File[], type: 'image' | 'asset') => {
    if (type === 'image') {
      setImageFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      const previewUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...(prevProduct.images || []), ...previewUrls],
      }));
    } else {
      setAssetFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      const previewUrls = acceptedFiles.map((file) => file.name); // For assets, we can use the file name
      setProduct((prevProduct) => ({
        ...prevProduct,
        assets: [...(prevProduct.assets || []), ...previewUrls],
      }));
    }
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'image'),
    accept: { 'image/*': [] },
  });

  const { getRootProps: getAssetRootProps, getInputProps: getAssetInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'asset'),
    accept: {
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/zip': [],
      'application/x-rar-compressed': [],
    },
  });

  const handleRemoveImage = (index: number) => {
    const updatedImages = (product.images || []).filter((_, i) => i !== index);
    const updatedImageFiles = imageFiles.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
    setImageFiles(updatedImageFiles);
  };

  const handleRemoveAsset = (index: number) => {
    const updatedAssets = (product.assets || []).filter((_, i) => i !== index);
    const updatedAssetFiles = assetFiles.filter((_, i) => i !== index);
    setProduct({ ...product, assets: updatedAssets });
    setAssetFiles(updatedAssetFiles);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfirmationDialogOpen(true);
  };

  const confirmSubmit = async () => {
    setLoading(true);
    setConfirmationDialogOpen(false);
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price.toString());
      formData.append('stock', product.stock.toString());
      formData.append('categoryId', product.categoryId);
      formData.append('brand', product.brand);
      formData.append('type', product.type);
      formData.append('inStock', product.inStock.toString());
      formData.append('isNew', product.new.toString());

      // Append image files
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      // Append asset files
      assetFiles.forEach((file) => {
        formData.append('assets', file);
      });

      if (productId) {
        // Update existing product
        await axios.put(`/api/products/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage('Product updated successfully!');
      } else {
        // Create new product
        await axios.post('/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage('Product created successfully!');
      }
      setSnackbarOpen(true);
      setActiveStep(steps.length);
      router.push('/products');
    } catch (error) {
      setError('Failed to submit the product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleConfirmationDialogClose = () => setConfirmationDialogOpen(false);

  const PreviewSection = () => (
    <Card variant="outlined" sx={{ mt: 2, mb: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Product Preview
        </Typography>
        <Typography>
          <strong>Name:</strong> {product.name}
        </Typography>
        <Typography>
          <strong>Description:</strong> {product.description}
        </Typography>
        <Typography>
          <strong>Price:</strong> ${product.price}
        </Typography>
        <Typography>
          <strong>Stock:</strong> {product.stock}
        </Typography>
        <Typography>
          <strong>Category:</strong> {categories.find((c) => c.id === product.categoryId)?.name}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Images:
        </Typography>
        <Grid container spacing={2}>
          {(product.images || []).map((image, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Image src={image} alt={`Preview image ${index}`} width={300} height={300} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Assets:
        </Typography>
        <Grid container spacing={2}>
          {(product.assets || []).map((asset, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Typography>{asset}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const StepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Stock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 1:
        return (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="categoryId"
              value={product.categoryId}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 2:
        return (
          <Box>
            <Paper
              variant="outlined"
              {...getImageRootProps()}
              sx={{ p: 2, borderColor: 'primary.main', textAlign: 'center', cursor: 'pointer', mb: 2 }}
            >
              <input {...getImageInputProps()} />
              <Typography>Drag & drop images here, or click to select files</Typography>
            </Paper>
            <Grid container spacing={2}>
              {(product.images || []).map((image, index) => (
                <Grid item key={index} xs={12} sm={6}>
                  <Box sx={{ position: 'relative' }}>
                    <Image src={image} alt={`Product image ${index + 1}`} width={500} height={500} />
                    <Tooltip title="Remove Image">
                      <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {loading && <LinearProgress sx={{ mt: 2 }} />}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Paper
              variant="outlined"
              {...getAssetRootProps()}
              sx={{ p: 2, borderColor: 'primary.main', textAlign: 'center', cursor: 'pointer', mb: 2 }}
            >
              <input {...getAssetInputProps()} />
              <Typography>Drag & drop assets here, or click to select files</Typography>
            </Paper>
            <Grid container spacing={2}>
              {(product.assets || []).map((asset, index) => (
                <Grid item key={index} xs={12} sm={6}>
                  <Box sx={{ position: 'relative' }}>
                    <Typography>{asset}</Typography>
                    <Tooltip title="Remove Asset">
                      <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => handleRemoveAsset(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {loading && <LinearProgress sx={{ mt: 2 }} />}
          </Box>
        );
      case 4:
        return <PreviewSection />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          {productId ? 'Edit Product' : 'Add New Product'}
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {StepContent()}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 2 }}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Next'}
              </Button>
            )}
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>

        <Dialog open={confirmationDialogOpen} onClose={handleConfirmationDialogClose}>
          <DialogTitle>Confirm Submission</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to finalize and submit this product?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={confirmSubmit} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AddListing;
