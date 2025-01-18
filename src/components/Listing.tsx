// All imports at the top
import React, { useState, FormEvent, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Grid,
  IconButton,
  LinearProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  Divider,
  Tooltip,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Import alternative icon
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info'; // Info icon for tooltips
import { SelectChangeEvent } from '@mui/material';
import { useDropzone } from 'react-dropzone';

// Hooks and Helpers
import { useProduct } from '../context/ProductContext';
import { useCategory } from '../context/CategoryContext';
import { uploadSingleRequest, uploadChunked } from '../helpers/fileUpload';

// =============================
// Constants for chunking logic
// =============================
const CHUNK_THRESHOLD = 100 * 1024 * 1024; // 100 MB
const CHUNK_SIZE = 5 * 1024 * 1024;       // 5 MB

// Representation of a single lesson for course curriculum
interface Lesson {
  title: string;
  duration: string;
  description: string;
}

// Validation errors shape
interface ValidationErrors {
  name?: string;
  headline?: string;
  title?: string;
  shortDescription?: string;
  description?: string;
  unitPrice?: string;
  stock?: string;
  categoryId?: string;
  courseInfo?: string;
  courseCurriculum?: Record<number, string>;
  authorInfoName?: string;
  authorInfoBio?: string;
  // Add other specific fields as needed
}

// We can represent the author info as an object:
interface AuthorInfo {
  name: string;
  avatar: string;
  bio: string;
  website: string;
}

const AddListing: React.FC = () => {
  // ============================
  // State for product fields
  // ============================
  const [product, setProduct] = useState({
    // Fields from ProductCreateDto
    name: '',
    headline: '',
    title: '',
    shortDescription: '',
    description: '',
    unitPrice: '',
    stock: '',
    rating: '',
    isNew: true,
    inStock: true,
    brand: '',
    type: 'physical' as 'physical' | 'digital',
    categoryId: '',

    // Additional fields not in base product but we store as metadata:
    courseInfo: '',
    courseCurriculum: [] as Lesson[],

    // =========== NEW: Author Info ===========
    authorInfo: {
      name: '',
      avatar: '/avatar-placeholder.png', // default or empty
      bio: '',
      website: '',
    } as AuthorInfo,
  });

  // Files (images or assets) to be uploaded
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  // UI states for feedback
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Validation error map
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Hooks from context
  const { addProduct } = useProduct();
  const {
    state: { categories = [] },
    fetchCategories,
  } = useCategory();

  // ============================
  // Dropzone for file upload
  // ============================
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFilesToUpload((prev) => [...prev, ...acceptedFiles]),
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/zip': [],
      // any other asset MIME types
    },
  });

  const removeFile = (file: File) => {
    setFilesToUpload((prev) => prev.filter((f) => f !== file));
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ============================
  // Input Handlers
  // ============================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // If updating top-level fields
    if (name in product) {
      setProduct((prev) => ({ ...prev, [name]: value }));
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
      return;
    }

    // If updating authorInfo sub-fields
    if (name.startsWith('authorInfo.')) {
      const fieldName = name.replace('authorInfo.', '') as keyof AuthorInfo;
      setProduct((prev) => ({
        ...prev,
        authorInfo: {
          ...prev.authorInfo,
          [fieldName]: value,
        },
      }));
      return;
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setProduct((prev) => ({ ...prev, categoryId: value }));
    setValidationErrors((prev) => ({ ...prev, categoryId: '' }));
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setProduct((prev) => ({
      ...prev,
      type: e.target.value as 'physical' | 'digital',
    }));
  };

  // ============================
  // Curriculum / Lessons
  // ============================
  const addLesson = () => {
    setProduct((prev) => ({
      ...prev,
      courseCurriculum: [
        ...prev.courseCurriculum,
        { title: '', duration: '', description: '' },
      ],
    }));
  };

  const changeLesson = (index: number, field: keyof Lesson, value: string) => {
    const updated = [...product.courseCurriculum];
    updated[index][field] = value;
    setProduct((prev) => ({ ...prev, courseCurriculum: updated }));

    // Clear any error on that lesson
    setValidationErrors((prev) => {
      const newVal = { ...prev };
      if (newVal.courseCurriculum && typeof newVal.courseCurriculum === 'object') {
        (newVal.courseCurriculum as Record<number, string>)[index] = '';
      }
      return newVal;
    });
  };

  const removeLesson = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      courseCurriculum: prev.courseCurriculum.filter((_, i) => i !== index),
    }));
  };

  // ============================
  // Validation
  // ============================
  const validateForm = (): ValidationErrors => {
    const errs: ValidationErrors = {};

    // Required fields
    if (!product.name) errs.name = 'Product Name is required.';
    if (!product.headline) errs.headline = 'Please provide a concise, eye-catching headline.';
    if (!product.title) errs.title = 'Please provide a descriptive title.';
    if (!product.shortDescription) errs.shortDescription = 'Short Description is required.';
    if (!product.description) errs.description = 'Full product description is required.';

    // Numeric fields
    if (!product.unitPrice || isNaN(Number(product.unitPrice))) {
      errs.unitPrice = 'Price must be a valid number.';
    }
    if (!product.stock || isNaN(Number(product.stock))) {
      errs.stock = 'Stock must be a valid number.';
    }

    // Category
    if (!product.categoryId) {
      errs.categoryId = 'Select a category that best fits your product/course.';
    }

    // Additional fields
    if (!product.courseInfo) {
      errs.courseInfo = 'Provide an overview for CourseInfo.';
    }

    // Curriculum
    if (product.courseCurriculum.length === 0) {
      errs.courseCurriculum = { 0: 'Add at least one lesson.' };
    } else {
      const cErrors: Record<number, string> = {};
      product.courseCurriculum.forEach((l, idx) => {
        if (!l.title) cErrors[idx] = 'Lesson title is required.';
        else if (!l.duration) cErrors[idx] = 'Use format like "2:44" for lesson duration.';
      });
      if (Object.keys(cErrors).length) errs.courseCurriculum = cErrors;
    }

    // Author Info
    if (!product.authorInfo.name) {
      errs.authorInfoName = 'Author name is required.';
    }
    if (!product.authorInfo.bio) {
      errs.authorInfoBio = 'Author bio is required.';
    }
    // Additional checks for avatar, website, etc. if needed

    return errs;
  };

  // ============================
  // Form Submit
  // ============================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted');
    setLoading(true);
    setUploadProgress(0);
    setError(null);

    // Validate
    const errs = validateForm();
    if (Object.keys(errs).length) {
      setValidationErrors(errs);
      setLoading(false);
      return;
    }

    // Build metadata from fields not in basic Product but stored as metadata
    // Note how we store "authorInfo" as JSON:
    const metadata = [
      { keyName: 'CourseInfo', keyValue: product.courseInfo },
      {
        keyName: 'CourseCurriculum',
        keyValue: JSON.stringify(product.courseCurriculum),
      },
      {
        keyName: 'AuthorInfo',
        keyValue: JSON.stringify(product.authorInfo),
      },
    ];

    try {
      // 1) Add product to DB
      const created = await addProduct({
        name: product.name,
        headline: product.headline,
        title: product.title,
        shortDescription: product.shortDescription,
        description: product.description,
        unitPrice: parseFloat(product.unitPrice),
        stock: parseInt(product.stock, 10),
        rating: parseFloat(product.rating) || 0, // default 0 if blank
        inStock: product.inStock,
        type: product.type,
        categoryId: product.categoryId,
        // crucial: pass the three metadata objects
        metadata,
      });

      // Log the response to ensure 'created' contains valid data
      console.log('Created product:', created);

      // Check if 'created' is valid and contains an 'id'
      if (created && created.id) {
        // Upload files if available
        if (filesToUpload.length > 0) {
          await uploadFiles(created.id, filesToUpload);
        }
      }

      // Show success
      setSuccessMessage('Product created and files uploaded successfully!');
      setSnackbarOpen(true);

      // (Optional) Reset the form or do something else
      // setProduct(...);
      // setFilesToUpload([]);
    } catch (ex) {
      console.error(ex);
      setError('Failed to create product or upload files');
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Upload helper
  // ============================
  const uploadFiles = async (productId: string, incomingFiles: File[]) => {
    if (!incomingFiles.length) return;

    const bigFiles: File[] = [];
    const smallFormData = new FormData();

    for (const file of incomingFiles) {
      if (file.size >= CHUNK_THRESHOLD) {
        bigFiles.push(file);
      } else {
        smallFormData.append('content', file);
      }
    }

    // Single request for smaller
    if (smallFormData.getAll('content').length) {
      await uploadSingleRequest(productId, smallFormData, (pct: number) =>
        setUploadProgress(pct),
      );
    }

    // Chunked for bigger
    for (const bf of bigFiles) {
      await uploadChunked(productId, bf, CHUNK_SIZE, (pct: number) => {
        setUploadProgress(pct);
      });
    }
  };

  // ============================
  // Render
  // ============================
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Product Listing
      </Typography>

      {loading && (
        <Box sx={{ mb: 2 }}>
          <Typography>Uploading... {uploadProgress}%</Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {successMessage}
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit}>
        {/* ========== Basic Fields ========== */}
        {/* Product Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            label="Product Name"
            name="name"
            placeholder="e.g. Intro to React"
            fullWidth
            value={product.name}
            onChange={handleInputChange}
            error={!!validationErrors.name}
          />
          <Tooltip title="Give your product a clear, recognizable name.">
            <IconButton>
              <InfoIcon color={validationErrors.name ? 'error' : 'action'} />
            </IconButton>
          </Tooltip>
        </Box>
        {validationErrors.name && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.name}
          </Typography>
        )}

        {/* Headline */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            label="Headline"
            name="headline"
            placeholder="A short, eye-catching phrase"
            fullWidth
            value={product.headline}
            onChange={handleInputChange}
            error={!!validationErrors.headline}
          />
          <Tooltip title="Keep it short and punchy to grab attention.">
            <IconButton>
              <InfoIcon color={validationErrors.headline ? 'error' : 'action'} />
            </IconButton>
          </Tooltip>
        </Box>
        {validationErrors.headline && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.headline}
          </Typography>
        )}

        {/* Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            label="Title"
            name="title"
            placeholder="A descriptive or somewhat longer title"
            fullWidth
            value={product.title}
            onChange={handleInputChange}
            error={!!validationErrors.title}
          />
          <Tooltip title="Provide a clear, descriptive title for your product or course.">
            <IconButton>
              <InfoIcon color={validationErrors.title ? 'error' : 'action'} />
            </IconButton>
          </Tooltip>
        </Box>
        {validationErrors.title && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.title}
          </Typography>
        )}

        {/* Short Description */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            label="Short Description"
            name="shortDescription"
            multiline
            rows={2}
            placeholder="A quick 1-2 sentence overview"
            fullWidth
            value={product.shortDescription}
            onChange={handleInputChange}
            error={!!validationErrors.shortDescription}
          />
          <Tooltip title="Give a concise overview or highlight.">
            <IconButton>
              <InfoIcon
                color={validationErrors.shortDescription ? 'error' : 'action'}
              />
            </IconButton>
          </Tooltip>
        </Box>
        {validationErrors.shortDescription && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.shortDescription}
          </Typography>
        )}

        {/* Full Description */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            label="Full Description"
            name="description"
            multiline
            rows={3}
            placeholder="Detailed info, features, benefits..."
            fullWidth
            value={product.description}
            onChange={handleInputChange}
            error={!!validationErrors.description}
          />
          <Tooltip title="Add comprehensive details about your product or course.">
            <IconButton>
              <InfoIcon color={validationErrors.description ? 'error' : 'action'} />
            </IconButton>
          </Tooltip>
        </Box>
        {validationErrors.description && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.description}
          </Typography>
        )}

        {/* Unit Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            label="Unit Price"
            name="unitPrice"
            type="number"
            placeholder="e.g., 49.99"
            fullWidth
            value={product.unitPrice}
            onChange={handleInputChange}
            error={!!validationErrors.unitPrice}
          />
          <Tooltip title="Set a price that reflects the product’s value.">
            <IconButton>
              <InfoIcon color={validationErrors.unitPrice ? 'error' : 'action'} />
            </IconButton>
          </Tooltip>
        </Box>
        {validationErrors.unitPrice && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.unitPrice}
          </Typography>
        )}

        {/* Stock */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            placeholder="e.g., 100"
            fullWidth
            value={product.stock}
            onChange={handleInputChange}
            error={!!validationErrors.stock}
          />
          <Tooltip title="How many units available? For digital, pick a large number.">
            <IconButton>
              <InfoIcon color={validationErrors.stock ? 'error' : 'action'} />
            </IconButton>
          </Tooltip>
        </Box>
        {validationErrors.stock && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.stock}
          </Typography>
        )}

        {/* Category */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={product.categoryId}
            onChange={handleSelectChange}
            error={!!validationErrors.categoryId}
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No categories available</MenuItem>
            )}
          </Select>
        </FormControl>
        {validationErrors.categoryId && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.categoryId}
          </Typography>
        )}

        {/* Course Info */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Course Info"
            name="courseInfo"
            placeholder="Prerequisites, skill level, overview..."
            multiline
            rows={2}
            fullWidth
            value={product.courseInfo}
            onChange={handleInputChange}
            error={!!validationErrors.courseInfo}
          />
          {validationErrors.courseInfo && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {validationErrors.courseInfo}
            </Typography>
          )}
        </Box>

        {/* ========== Curriculum ========== */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Course Curriculum
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Outline each lesson or module. For &ldquo;Duration&rdquo;, use
          &ldquo;2:44&rdquo; or &ldquo;1:05:30&rdquo;.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {product.courseCurriculum.map((lesson, idx) => (
          <Box key={idx} sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 2 }}>
            <TextField
              label="Lesson Title"
              fullWidth
              sx={{ mb: 1 }}
              value={lesson.title}
              onChange={(e) => changeLesson(idx, 'title', e.target.value)}
              error={
                !!(
                  validationErrors.courseCurriculum &&
                  validationErrors.courseCurriculum[idx]
                )
              }
            />
            <TextField
              label="Duration"
              placeholder='e.g. "2:44"'
              fullWidth
              sx={{ mb: 1 }}
              value={lesson.duration}
              onChange={(e) => changeLesson(idx, 'duration', e.target.value)}
            />
            <TextField
              label="Lesson Description"
              fullWidth
              multiline
              rows={2}
              placeholder="Briefly summarize this lesson's content."
              value={lesson.description}
              onChange={(e) => changeLesson(idx, 'description', e.target.value)}
            />
            {validationErrors.courseCurriculum &&
              typeof validationErrors.courseCurriculum === 'object' &&
              validationErrors.courseCurriculum[idx] && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {validationErrors.courseCurriculum[idx]}
                </Typography>
              )}
            <IconButton color="error" onClick={() => removeLesson(idx)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addLesson}
          sx={{ mb: 2 }}
        >
          Add Lesson
        </Button>

        {/* ========== Author Info ========== */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Author Info
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Provide details about the course author or product creator.
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <TextField
          label="Author Name"
          name="authorInfo.name"
          fullWidth
          sx={{ mb: 2 }}
          value={product.authorInfo.name}
          onChange={handleInputChange}
          error={!!validationErrors.authorInfoName}
        />
        {validationErrors.authorInfoName && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.authorInfoName}
          </Typography>
        )}

        <TextField
          label="Author Avatar URL"
          name="authorInfo.avatar"
          fullWidth
          sx={{ mb: 2 }}
          value={product.authorInfo.avatar}
          onChange={handleInputChange}
        />

        <TextField
          label="Author Bio"
          name="authorInfo.bio"
          fullWidth
          multiline
          rows={2}
          sx={{ mb: 2 }}
          value={product.authorInfo.bio}
          onChange={handleInputChange}
          error={!!validationErrors.authorInfoBio}
        />
        {validationErrors.authorInfoBio && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {validationErrors.authorInfoBio}
          </Typography>
        )}

        <TextField
          label="Author Website"
          name="authorInfo.website"
          fullWidth
          sx={{ mb: 2 }}
          value={product.authorInfo.website}
          onChange={handleInputChange}
        />

        {/* ============================
            Files (images/assets)
           ============================ */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Optional:</strong> Add images or other supporting files below.
          Large files ({'>'}100 MB) will automatically upload in chunks.
        </Typography>
        {/* Alternatively, using HTML entities:
        Large files (&gt;100 MB) will automatically upload in chunks.
        */}
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #ccc',
            p: 2,
            mb: 2,
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body2">
            Drag & drop files here, or click to select
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {filesToUpload.map((file, idx) => (
            <Grid item key={idx}>
              <Typography variant="body2">{file.name}</Typography>
              <IconButton onClick={() => removeFile(file)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>

        {/* Submit Button */}
        <Button type="submit" variant="contained" disabled={loading}>
          Create Product
        </Button>
      </form>
    </Container>
  );
};

export default AddListing;
