import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",

});

// Attach token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Function to get the CSRF cookie
export const getCsrfToken = async () => {
  try {
    await apiClient.get('/sanctum/csrf-cookie');
    console.log('CSRF cookie set');
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};
export default apiClient;
