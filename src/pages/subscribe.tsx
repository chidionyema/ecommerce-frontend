import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import SubscriptionModal from '../components/SubscriptionModal';
import { useAuth } from '../contexts/AuthContext';

const SubscribePage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  // Extract the redirect path from the query; default to "/resources"
  const redirectPath =
    typeof router.query.redirect === 'string' ? router.query.redirect : '/resources';

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {user ? (
        <SubscriptionModal redirectPath={redirectPath} />
      ) : (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Please log in to subscribe
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`)
            }
          >
            Login
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default SubscribePage;
