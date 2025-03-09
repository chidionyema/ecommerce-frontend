import { useState } from 'react';
import Head from 'next/head';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import SubscriptionDetails from '../../components/subscription/SubscriptionDetails';
import CancellationModal from '../../components/subscription/CancellationModal';
import { useAuth } from '../../contexts/AuthContext';

export default function ManageSubscriptionPage() {
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const { cancelSubscription, updatePaymentMethod, refreshSubscriptionDetails } = useAuth();

  const handleUpdatePaymentMethod = async () => {
    const result = await updatePaymentMethod();
    if (!result.success) {
      alert(result.error || 'Failed to update payment method');
    }
  };

  const handleCancelSubscription = async () => {
    const result = await cancelSubscription();
    if (result.success) {
      await refreshSubscriptionDetails();
    } else {
      alert(result.error || 'Failed to cancel subscription');
    }
    setIsCancellationModalOpen(false);
  };

  return (
    <ProtectedRoute requireSubscription>
      <Head>
        <title>Manage Subscription | YourApp</title>
        <meta name="description" content="Manage your subscription" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Manage Subscription</h1>

          <SubscriptionDetails
            onManage={handleUpdatePaymentMethod}
            onCancel={() => setIsCancellationModalOpen(true)}
          />

          <CancellationModal
            isOpen={isCancellationModalOpen}
            onClose={() => setIsCancellationModalOpen(false)}
            onConfirm={handleCancelSubscription}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
