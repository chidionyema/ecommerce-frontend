import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If already authenticated, redirect to the intended destination or dashboard
    if (!isAuthLoading) {
      if (user) {
        const redirectPath = router.query.redirect as string || '/dashboard';
        router.push(redirectPath);
      } else {
        setLoading(false);
      }
    }
  }, [user, isAuthLoading, router]);

  if (loading || isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login | YourApp</title>
        <meta name="description" content="Login to your account" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </>
  );
}