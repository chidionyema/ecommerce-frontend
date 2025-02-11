// pages/login.tsx
import { useAuth } from '../contexts/AuthContext';
import { Container, Button } from '@mui/material'; 
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const redirect = router.query.redirect || '/resources';

  return (
    <Container maxWidth="md">
      <Button 
        variant="contained"
        onClick={() => {
          // Pass dummy credentials for now; later replace these with form input values.
          login({ Username: 'demoUser', Password: 'demoPassword' });
          router.push(redirect as string);
        }}
      >
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
