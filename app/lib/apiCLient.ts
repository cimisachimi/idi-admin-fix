import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // This enables sending and receiving cookies
});

// This function asks the backend for the initial security cookie
export const getCsrfToken = async () => {
  try {
    await apiClient.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

export default apiClient;