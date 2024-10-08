// pages/edit-product.tsx
import React from 'react';
import AddListing from '../components/Listing';
import { useRouter } from 'next/router';

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <AddListing productId={id as string} />;
};

export default EditProductPage;
