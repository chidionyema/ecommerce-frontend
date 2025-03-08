/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration
  output: 'export',
  distDir: 'out',
  
  // Images must be unoptimized with static export
  images: {
    unoptimized: true,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.haworks.com',
    NEXT_PUBLIC_CSP_NONCE: process.env.NEXT_PUBLIC_CSP_NONCE || '',
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || ''
  },
  
  // Webpack optimization
  webpack: (config, { isServer, dev }) => {
    // Add filesystem cache configuration
    config.cache = {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.tmp/webpack-cache'),
      buildDependencies: {
        config: [__filename]
      }
    };
    
    // For client-side bundles, optimize chunk splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // Your existing cache groups here
        },
      };
    }
    
    // Add fallbacks for Node.js core modules
    config.resolve.fallback = {
      fs: false,
      path: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
    };
    
    return config;
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    externalDir: true
  },
  
  // Add trailing slash for better static file handling
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;