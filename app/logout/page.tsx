'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../lib/apiCLient';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // This call will invalidate the session cookie
        await apiClient.post('/logout');
      } catch (error) {
        console.error('Logout failed, but proceeding to log out client-side.', error);
      } finally {
        // Redirect to login page
        router.push('/');
      }
    };

    logout();
  }, [router]);

  return <p>Logging out...</p>;
}