// pages/add-listing.tsx
import React from 'react';
import AddListing from '../components/Listing';
import { Container, Typography, Box } from '@mui/material';

const AddListingPage: React.FC = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
         
        </Typography>
        <AddListing />
      </Box>
    </Container>
  );
};

export default AddListingPage;
