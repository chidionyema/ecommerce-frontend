import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireSubscription = false
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the auth context to access authentication state
  const { 
    isAuthenticated, 
    isSubscribed, 
    user, 
    token, 
    error, 
    isLoading: authLoading 
  } = useAuth();

  useEffect(() => {
    // Only proceed when auth context has finished loading
    if (!authLoading) {
      const checkAuth = async () => {
        try {
          // If not authenticated, redirect to login
          if (!isAuthenticated || !token) {
            router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
            return;
          }

          // Check subscription requirement
          if (requireSubscription && !isSubscribed) {
            router.push('/pricing');
            return;
          }

          // Everything is valid
          setIsLoading(false);
        } catch (error) {
          console.error('Route protection error:', error);
          router.push('/login');
        }
      };

      checkAuth();
    }
  }, [isAuthenticated, isSubscribed, authLoading, router, requireSubscription, token]);

  // Show loading state
  if (isLoading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render children if auth check fails
  if (!isAuthenticated || (requireSubscription && !isSubscribed)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;