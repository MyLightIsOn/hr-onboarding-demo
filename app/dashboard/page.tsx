'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const roleId = searchParams.get('role');

  if (!roleId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No role selected</h1>
          <p className="text-gray-600">Please select a role from the landing page.</p>
          <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back to landing page
          </a>
        </div>
      </div>
    );
  }

  return <DashboardContent roleId={roleId} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPageContent />
    </Suspense>
  );
}
