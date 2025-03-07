/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Core configuration
  output: 'standalone',
  productionBrowserSourceMaps: false,
  
  // Security headers moved to async headers() function
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  },

  webpack: (config, { isServer }) => {
    // Proper null-loader installation required
    config.module.rules.push({
      test: /next[\\/]dist[\\/]esm[\\/]server[\\/]use-cache/,
      use: require.resolve('null-loader')
    });

    // Corrected crypto polyfill path
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/cache': false,
      crypto: path.resolve(__dirname, 'polyfills/crypto.js')
    };

    return config;
  },

  // Updated server external packages configuration
  serverExternalPackages: ['bufferutil', 'utf-8-validate'],
  
  experimental: {
    disableOptimizedLoading: true
  }
};

// Security headers configuration
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none';`
  }
];

module.exports = nextConfig;