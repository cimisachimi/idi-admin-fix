import axios from 'axios';

// Add these defaults to enable automatic CSRF protection
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default apiClient;