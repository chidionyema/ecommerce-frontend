// src/components/ProductDetails.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '../store'; // Correctly import RootState

import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Rating,
  Snackbar,
  CssBaseline,
  Badge,
  Divider,
  Skeleton,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice'; // Import addItem action
import { useWishlist } from '../context/WishlistContext'; // Wishlist context
import AboutTheAuthor, { AuthorInfo } from './AboutTheAuthor';

// Import CardMediaProps
import { CardMedia, CardMediaProps } from '@mui/material';

// Types
interface Content {
  id: string;
  entityId: string;
  entityType: string;
  contentType: 'Image' | 'Asset';
  url: string;
  blobName: string;
  createdAt: string;
}

interface ProductMetadata {
  id: string;
  keyName: string;
  keyValue: string;
}

interface Product {
  id: string;
  name: string;
  headline: string;
  title: string;
  shortDescription: string;
  description: string;
  authorAvatarUrl: string;
  authorName: string;
  unitPrice: number;
  stock: number;
  categoryId: string;
  contents: Content[];
  rating: number;
  new: boolean;
  brand: string;
  type: 'physical' | 'digital';
  inStock: boolean;
  reviews?: { user: string; comment: string; rating: number }[];
  metadata?: ProductMetadata[];
}

interface Lesson {
  title: string;
  duration?: string;
  description?: string;
}

interface CourseInfo {
  level?: string;
  duration?: string;
  rating?: number;
  price?: number;
}

// Styled Components
const DetailsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#fafafa',
  minHeight: '100vh',
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const Gallery = styled(Box)({
  display: 'flex',
  gap: '10px',
  overflowX: 'auto',
  paddingBottom: '10px',
  '& img': {
    cursor: 'pointer',
    borderRadius: '10px',
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});

// Correctly typed styled CardMedia component
const ProductImage = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
  borderRadius: '10px',
  objectFit: 'contain',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
}));

const InfoSectionBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  transition: 'transform 0.2s ease-in-out',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
}));

const InfoSectionHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: '600',
  fontSize: '1.5rem',
  color: theme.palette.text.primary,
}));

// CurriculumSection Component
const CurriculumSection: React.FC<{ lessons: Lesson[] }> = ({ lessons }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <InfoSectionBox>
      <InfoSectionHeading>Course Curriculum</InfoSectionHeading>
      <Divider sx={{ mb: 2 }} />
      {lessons.map((lesson, idx) => (
        <Accordion key={idx} expanded={expanded === `panel-${idx}`} onChange={handleChange(`panel-${idx}`)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{lesson.title}</Typography>
            {lesson.duration && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto', mr: 1 }}>
                {lesson.duration}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{lesson.description || 'No additional details available.'}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </InfoSectionBox>
  );
};

// ProductDetails Component
const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );

  useEffect(() => {
    if (router.isReady) {
      const productId = Array.isArray(id) ? id[0] : id;
      if (!productId) return;

      fetch(`https://api.local.ritualworks.com/api/products/${productId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Fetch failed with status ${res.status}`);
          }
          return res.json();
        })
        .then((data: Product) => {
          setFetchedProduct(data);
          const firstImage = data.contents.find((c) => c.contentType === 'Image');
          if (firstImage) {
            setMainImage(firstImage.url);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching product:', err);
          setLoading(false);
        });
    }
  }, [router.isReady, id]);

  const addToBasket = (p: Product) => {
    const cartItem = {
      productid: p.id,
      name: p.name,
      unitPrice: p.unitPrice,
      quantity: 1,
    };
    dispatch(addItem(cartItem));
    setSnackbarMessage(`Added ${p.name} to basket`);
    setSnackbarOpen(true);
  };

  const toggleWishlist = (p: Product) => {
    const isInWishlist = wishlistState.items.some((item) => item.id === p.id);
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', id: p.id });
      setSnackbarMessage(`Removed ${p.name} from wishlist`);
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', product: p });
      setSnackbarMessage(`Added ${p.name} to wishlist`);
    }
    setSnackbarOpen(true);
  };

  const imageThumbnails = useMemo(
    () => fetchedProduct?.contents.filter((c) => c.contentType === 'Image').map((c) => c.url) || [],
    [fetchedProduct]
  );

  const fallbackCourseInfo: CourseInfo = {
    level: 'Intermediate',
    duration: '3h 0m',
    rating: 4.5,
    price: fetchedProduct?.unitPrice,
  };

  // Parse CourseInfo metadata
  const courseInfoMeta = fetchedProduct?.metadata?.find((m) => m.keyName === 'CourseInfo');
  let parsedCourseInfo: Partial<CourseInfo> = {};

  if (courseInfoMeta && courseInfoMeta.keyValue) {
    try {
      parsedCourseInfo = JSON.parse(courseInfoMeta.keyValue);
    } catch (error) {
      console.error('Error parsing CourseInfo metadata:', error);
      // Optionally, handle the error (e.g., set default values)
    }
  }

  // Merge fallbackCourseInfo with parsedCourseInfo
  const mergedCourseInfo: CourseInfo = { ...fallbackCourseInfo, ...parsedCourseInfo };

  // Parse Curriculum metadata
  const curriculumMeta = fetchedProduct?.metadata?.find((m) => m.keyName === 'CourseCurriculum');
  let lessonOutline: Lesson[] = [];

  if (curriculumMeta && curriculumMeta.keyValue) {
    try {
      const parsed = JSON.parse(curriculumMeta.keyValue);
      if (Array.isArray(parsed)) {
        // Optionally, validate each lesson object
        lessonOutline = parsed.map((lesson: any) => ({
          title: lesson.title || 'Untitled Lesson',
          duration: lesson.duration,
          description: lesson.description,
        }));
      } else {
        console.warn('CourseCurriculum keyValue is not an array');
      }
    } catch (error) {
      console.error('Error parsing CourseCurriculum metadata:', error);
      // Optionally, handle the error (e.g., set default values)
    }
  }

  // Parse AuthorInfo metadata
  const authorInfoMeta = fetchedProduct?.metadata?.find((m) => m.keyName === 'AuthorInfo');
  const authorInfo: AuthorInfo = authorInfoMeta
    ? JSON.parse(authorInfoMeta.keyValue)
    : { name: 'Unknown', avatar: '/avatar-placeholder.png', bio: 'No author info available.', website: '#' };

  if (loading) {
    return (
      <DetailsContainer>
        <CssBaseline />
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading product details...</Typography>
        </Box>
      </DetailsContainer>
    );
  }

  if (!fetchedProduct) {
    return (
      <DetailsContainer>
        <CssBaseline />
        <Typography>Product not found</Typography>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <CssBaseline />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <IconButton onClick={() => router.back()} aria-label="Go back">
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => router.push('/cart')}>
          <Badge badgeContent={cartItemsCount} color="secondary">
           
          </Badge>
        </IconButton>
      </Box>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          {imageLoading && <Skeleton variant="rectangular" width="100%" height={500} />}
          {mainImage && (
            <ProductImage
              component="img"
             
              src={mainImage} // Correct prop
             
              onLoad={() => setImageLoading(false)}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
          )}
          {imageThumbnails.length > 1 && (
            <Gallery>
              {imageThumbnails.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={() => {
                    setImageLoading(true);
                    setMainImage(img);
                  }}
                  loading="lazy"
                />
              ))}
            </Gallery>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {fetchedProduct.name}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
            ${fetchedProduct.unitPrice.toFixed(2)}
          </Typography>
          <Rating name="read-only" value={fetchedProduct.rating} readOnly />
          <Typography variant="body1" mt={2}>
            {fetchedProduct.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#6a11cb',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#9244e3',
                },
              }}
              startIcon={<ShoppingCartIcon />}
              onClick={() => addToBasket(fetchedProduct)}
            >
              Add to Basket
            </Button>
            <IconButton onClick={() => toggleWishlist(fetchedProduct)}>
              {wishlistState.items.some((item) => item.id === fetchedProduct.id) ? (
                <FavoriteIcon sx={{ color: '#6a11cb' }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <InfoSectionBox>
        <InfoSectionHeading>Course Information</InfoSectionHeading>
        <Typography variant="body1">Level: {mergedCourseInfo.level}</Typography>
        <Typography variant="body1">Duration: {mergedCourseInfo.duration}</Typography>
        <Typography variant="body1">Rating: {mergedCourseInfo.rating} / 5</Typography>
        <Typography variant="body1">Price: ${mergedCourseInfo.price?.toFixed(2)}</Typography>
      </InfoSectionBox>

      <CurriculumSection lessons={lessonOutline} />
      <AboutTheAuthor author={authorInfo} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </DetailsContainer>
  );
};

export default ProductDetails;
