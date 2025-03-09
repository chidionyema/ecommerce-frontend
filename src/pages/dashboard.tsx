import Head from 'next/head';
import Link from 'next/link';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user, isSubscribed } = useAuth();

  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard | YourApp</title>
        <meta name="description" content="Your personal dashboard" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Welcome, {user?.userName}</h1>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Your Account</h2>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <dl className="divide-y divide-gray-200">
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{user?.email}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Subscription Status</dt>
                    <dd className="text-sm text-gray-900">
                      {isSubscribed ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Free
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                {isSubscribed ? (
                  <Link
                    href="/account/subscription"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Manage Subscription
                  </Link>
                ) : (
                  <Link
                    href="/subscription"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Upgrade to Premium
                  </Link>
                )}
                <Link
                  href="/account/settings"
                  className="text-sm font-medium text-gray-600 hover:text-gray-500"
                >
                  Account Settings
                </Link>
              </div>
            </div>
          </div>

          {!isSubscribed && (
            <div className="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-indigo-800">Unlock Premium Features</h3>
                  <p className="mt-2 text-indigo-700">
                    Upgrade to our premium plan to access all features and get the most out of our platform.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/subscription"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      View Plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
