'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../lib/apiCLient';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await apiClient.post('/api/logout');
      } catch (error) {
        console.error('Logout failed', error);
      } finally {
        router.push('/');
      }
    };

    logout();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging out...</p>
    </div>
  );
}