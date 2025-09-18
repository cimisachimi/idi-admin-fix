import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. https://indocharcoalsupply.com/api
  withCredentials: true, // This is essential for cookie-based auth
});

// This function gets the initial CSRF cookie from Laravel Sanctum
export const getCsrfToken = async () => {
  try {
    // remove "/api" from the base URL if it exists
    const base = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '';
    await axios.get(`${base}/sanctum/csrf-cookie`, { withCredentials: true });
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

export default apiClient;
