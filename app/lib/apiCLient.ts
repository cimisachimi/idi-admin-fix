import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // This is the crucial line for cookie-based auth
});

// Function to get the CSRF cookie
export const getCsrfToken = async () => {
  try {
    await apiClient.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

export default apiClient;