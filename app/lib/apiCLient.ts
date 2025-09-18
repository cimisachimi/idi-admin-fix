import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // This is essential for cookie-based auth
});

// This function gets the initial security cookie from the backend
export const getCsrfToken = async () => {
  try {
    await apiClient.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

export default apiClient;