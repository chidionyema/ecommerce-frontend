const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export configuration to enable API routes
  // output: 'export',
  // distDir: 'out',
  
  // Image optimization settings
  images: {
    domains: ['api.haworks.com'], // Add domains you need to load images from
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.haworks.com',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://api.haworks.com',
    NEXT_PUBLIC_CSP_NONCE: process.env.NEXT_PUBLIC_CSP_NONCE || '',
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || '',
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  },
  
  // Content Security Policy headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https: blob:;
              font-src 'self' data:;
              connect-src 'self' https://api.haworks.com https://www.google-analytics.com;
              frame-src 'self' https://www.google.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              block-all-mixed-content;
              upgrade-insecure-requests;
              worker-src 'self' blob:;
            `.replace(/\s+/g, ' ').trim()
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  // Webpack optimization
  webpack: (config, { isServer, dev }) => {
    // Add filesystem cache configuration
    config.cache = {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
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
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          // Add specific optimizations for larger packages
          nextAuth: {
            test: /[\\/]node_modules[\\/]next-auth[\\/]/,
            name: 'next-auth',
            priority: 10,
          },
          react: {
            test: /[\\/]node_modules[\\/]react[\\/]/,
            name: 'react',
            priority: 20,
          },
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
    scrollRestoration: true,
  },
  
  // Use trailing slash for better routing
  trailingSlash: true,
  reactStrictMode: true,
  
  // Increase timeout for build process
  staticPageGenerationTimeout: 120,
  
  // Configure powered by header
  poweredByHeader: false,
};

module.exports = nextConfig;