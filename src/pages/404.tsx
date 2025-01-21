import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Link href="/" passHref legacyBehavior>
          <Button variant="contained" color="primary" size="large">
            Go Back Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Custom404;