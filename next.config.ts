import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing images configuration
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      // I've added this to allow images from your live API
      {
        protocol: 'https',
        hostname: 'api.indocharcoalsupply.com',
        pathname: '/storage/**',
      },
    ],
  },

  // --- Add the headers function below ---
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // This policy allows connections and images from your API
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://api.indocharcoalsupply.com http://localhost:8000; font-src 'self'; connect-src 'self' https://api.indocharcoalsupply.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;