// src/app/login/page.tsx (or your actual path to the login page)
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head'; // Can use Head for page-specific title/meta if not handled by a higher layout
import LoginForm from '@/components/auth/LoginForm'; // Ensure path is correct
import { useAuth } from '@/contexts/AuthContext'; // Ensure path is correct

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthLoading } = useAuth(); // This will now work due to AuthProvider in RootLayout
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading) {
      if (user) {
        // Use 'callbackUrl' as sent from ResourceCard, or default
        const redirectPath = searchParams.get('callbackUrl') || '/dashboard';
        router.push(redirectPath);
      } else {
        setLoading(false);
      }
    }
  }, [user, isAuthLoading, router, searchParams]);

  if (loading || isAuthLoading) {
    return (
      // Simple loading spinner for the login page
      <div className="flex justify-center items-center min-h-screen bg-gray-100"> {/* Added a light bg for loading state */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login | YourApp</title>
        <meta name="description" content="Login to your account" />
        {/* Add any other specific meta tags for the login page */}
      </Head>

      {/* Original simple layout for the login page */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </>
  );
}