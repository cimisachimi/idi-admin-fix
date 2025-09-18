import axios from 'axios';

axios.defaults.withCredentials = true; // 🔑 ensures cookies are sent

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g., https://indocharcoalsupply.com
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // tells Laravel it's an AJAX request
  },
});

export default apiClient;
