import { NextPage } from 'next';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  let errorMessage = 'An unexpected error occurred';
  if (statusCode === 404) {
    errorMessage = 'Oops! Page Not Found';
  }

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
          {statusCode || 'Error'}
        </Typography>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {errorMessage}
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

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;