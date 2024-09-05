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
    SelectChangeEvent,
    Alert
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { Product } from '../types/types';

interface Category {
    id: string;
    name: string;
}

const steps = ['Basic Information', 'Category Selection', 'Upload Images', 'Upload Assets', 'Review and Submit'];

const AddListing: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '', // Use category instead of categoryId
        images: [],
        assets: [],
        rating: 0,
        new: true,
        brand: '',
        type: 'physical',
        inStock: true,
        reviews: [] // Initialize reviews as an empty array
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://api.local.ritualworks.com/api/products/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError('Failed to fetch categories. Please try again.');
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const onDrop = (acceptedFiles: File[], type: 'image' | 'asset') => {
        const uploadPromises = acceptedFiles.map((file) => uploadFile(file, type));
        Promise.all(uploadPromises)
            .then((urls) => {
                if (type === 'image') {
                    setProduct({ ...product, images: [...product.images, ...urls] });
                } else {
                    setProduct({ ...product, assets: [...product.assets, ...urls] });
                }
            })
            .catch((uploadError) => setError(`Failed to upload ${type}s: ${uploadError.message}`));
    };

    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
        onDrop: (files) => onDrop(files, 'image'),
        accept: {
            'image/*': []
        }
    });

    const { getRootProps: getAssetRootProps, getInputProps: getAssetInputProps } = useDropzone({
        onDrop: (files) => onDrop(files, 'asset'),
        accept: {
            'application/pdf': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
            'application/zip': [],
            'application/x-rar-compressed': []
        }
    });

    const handleRemoveImage = (index: number) => {
        const updatedImages = product.images.filter((_, i) => i !== index);
        setProduct({ ...product, images: updatedImages });
    };

    const handleRemoveAsset = (index: number) => {
        const updatedAssets = product.assets.filter((_, i) => i !== index);
        setProduct({ ...product, assets: updatedAssets });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://api.local.ritualworks.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Failed to submit the product');
            }

            setActiveStep(steps.length); // Move to the last step
            setSnackbarOpen(true);
        } catch (error) {
            setError('Failed to submit the product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const StepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Box>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Product Name"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            multiline
                            minRows={3}
                            id="description"
                            label="Description"
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            name="price"
                            type="number"
                            value={product.price}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            id="stock"
                            label="Stock"
                            name="stock"
                            type="number"
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
                            name="category"
                            value={product.category}
                            onChange={handleInputChange}
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
                            sx={{
                                padding: 2,
                                borderColor: 'primary.main',
                                borderRadius: 1,
                                textAlign: 'center',
                                cursor: 'pointer',
                                mb: 2
                            }}
                        >
                            <input {...getImageInputProps()} />
                            <Typography>Drag & drop images here, or click to select files</Typography>
                        </Paper>
                        <Grid container spacing={2}>
                            {product.images.map((image, index) => (
                                <Grid item key={index} xs={12} sm={6}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Image src={image} alt={`Product image ${index + 1}`} width={500} height={500} />
                                        <IconButton
                                            sx={{ position: 'absolute', top: 0, right: 0 }}
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                );
            case 3:
                return (
                    <Box>
                        <Paper
                            variant="outlined"
                            {...getAssetRootProps()}
                            sx={{
                                padding: 2,
                                borderColor: 'primary.main',
                                borderRadius: 1,
                                textAlign: 'center',
                                cursor: 'pointer',
                                mb: 2
                            }}
                        >
                            <input {...getAssetInputProps()} />
                            <Typography>Drag & drop assets here, or click to select files</Typography>
                        </Paper>
                        <Grid container spacing={2}>
                            {product.assets.map((asset, index) => (
                                <Grid item key={index} xs={12} sm={6}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Typography>{asset}</Typography>
                                        <IconButton
                                            sx={{ position: 'absolute', top: 0, right: 0 }}
                                            onClick={() => handleRemoveAsset(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                );
            case 4:
                return (
                    <Box>
                        <Typography variant="h6">Review and Submit</Typography>
                        <Typography>Name: {product.name}</Typography>
                        <Typography>Description: {product.description}</Typography>
                        <Typography>Price: ${product.price}</Typography>
                        <Typography>Stock: {product.stock}</Typography>
                        <Typography>Category: {categories.find(category => category.id === product.category)?.name}</Typography>
                        {product.images.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography>Images:</Typography>
                                <Grid container spacing={2}>
                                    {product.images.map((image, index) => (
                                        <Grid item key={index} xs={12} sm={6}>
                                            <Image src={image} alt={`Product image ${index + 1}`} width={500} height={500} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                        {product.assets.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography>Assets:</Typography>
                                <Grid container spacing={2}>
                                    {product.assets.map((asset, index) => (
                                        <Grid item key={index} xs={12} sm={6}>
                                            <Typography>{asset}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </Box>
                );
            default:
                return null;
        }
    };

    const uploadFile = async (file: File, type: 'image' | 'asset'): Promise<string> => {
        const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const fileName = file.name;
        let uploadUrl: string = '';
        const username = "your-username"; // This should be dynamically set, e.g., from auth context
        const productId = "your-product-id"; // This should be dynamically set, e.g., from the product context

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const chunk = file.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);
            const formData = new FormData();
            formData.append('file', chunk);
            formData.append('chunkIndex', chunkIndex.toString());
            formData.append('totalChunks', totalChunks.toString());
            formData.append('fileName', fileName);
            formData.append('username', username);
            formData.append('productId', productId);
            formData.append('type', type);

            const response = await fetch('https://api.local.ritualworks.com/api/assets/upload-chunk', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to upload chunk ${chunkIndex + 1}/${totalChunks}`);
            }

            if (chunkIndex === totalChunks - 1) {
                const responseData = await response.json();
                uploadUrl = responseData.FileName;
            }
        }

        return uploadUrl;
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Add New Product
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
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
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
                        Product {product.id ? 'updated' : 'added'} successfully!
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default AddListing;
