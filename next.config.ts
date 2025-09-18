/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // needed for static hosting
  basePath: "/admin",        // because you serve it under /admin
  assetPrefix: "/admin/",    // makes CSS/JS load from /admin
};

export default nextConfig;
