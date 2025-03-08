/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep this for static export
  output: 'export',
  distDir: 'out',
  
  // Remove the headers function - it won't work with static export
  
  // Images need to be unoptimized with static export
  images: {
    unoptimized: true,
  },
  
  // Keep your webpack optimization
  webpack: (config, { isServer, dev }) => {
    // Your existing webpack config...
    return config;
  },
  
  experimental: {
    optimizeCss: true,
    externalDir: true
  },
  
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;