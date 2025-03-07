/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Set output for Cloudflare compatibility
  output: 'export',
  
  // Disable browser source maps to reduce bundle size
  productionBrowserSourceMaps: false,
  
  // Enable compression for Cloudflare
  compress: true,

  // Images configuration for Cloudflare
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-cdn.com'
      }
    ],
    imageSizes: [16, 32, 48, 64]
  },
  
  // Security headers configuration with environment awareness
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
      (isProduction
        ? 'https://api.ritualworks.com'
        : 'https://api.local.ritualworks.com');
    
    const cspDirectives = [
      `default-src 'self'`,
      `script-src 'self' ${!isProduction ? "'unsafe-inline' 'unsafe-eval'" : ''} https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
      `style-src 'self' ${!isProduction ? "'unsafe-inline'" : ''} https://fonts.googleapis.com`,
      `img-src 'self' data: https://*.stripe.com https://www.google.com/recaptcha/`,
      `connect-src 'self' ${apiUrl} ${!isProduction ? 'http://localhost:3000 ws://localhost:3000' : ''} https://checkout.stripe.com https://api.ritualworks.com`,
      `frame-src 'self' https://js.stripe.com https://www.google.com/recaptcha/ https://stripe.com`,
      `font-src 'self' https://fonts.gstatic.com`,
      `form-action 'self'`,
      `frame-ancestors 'none'`
    ];
    
    if (!isProduction) {
      cspDirectives.push('report-uri /api/csp-report');
    }
    
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives.join('; ').trim(),
          }
        ]
      }
    ];
  },

  // Webpack configuration optimized for Cloudflare
  webpack: (config, { isServer }) => {
    // Split chunks more aggressively to reduce bundle size
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 1000000, // 1MB max chunk size for Cloudflare
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)/,
            name: 'react-core',
            priority: 50
          },
          next: {
            test: /[\\/]node_modules[\\/](next|@next)/,
            name: 'next-core',
            priority: 40
          },
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            name: 'framework',
            priority: 30,
            chunks: 'all',
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return `vendor.${packageName?.replace('@', '') || 'misc'}`;
            },
            priority: 20
          }
        }
      };
    }

    // Critical size limits
    config.performance = {
      maxEntrypointSize: 2500000,
      maxAssetSize: 2500000
    };

    // Node.js polyfills for client
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        http: false,
        https: false,
        stream: false,
        crypto: false
      };
    }

    // Add proper null-loader
    config.module.rules.push({
      test: /next[\\/]dist[\\/]esm[\\/]server[\\/]use-cache/,
      use: require.resolve('null-loader')
    });

    // Also handle other problematic modules
    config.module.rules.push({
      test: /node_modules[\\\/](stripe|micro|iconv-lite|safer-buffer)[\\\/]/,
      use: 'null-loader',
    });

    // Fix crypto polyfill
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/cache': false,
      crypto: path.resolve(__dirname, 'polyfills/crypto.js')
    };

    return config;
  },
  
  // Externalize heavy dependencies
  serverExternalPackages: [
    'bufferutil',
    'utf-8-validate',
    'sharp',
    'aws-sdk'
  ],
  
  // Cloudflare-specific optimizations
  experimental: {
    optimizeCss: true,
    disableOptimizedLoading: process.env.NODE_ENV === 'development'
  },
  
  // Handle trailing slash for Cloudflare Pages
  trailingSlash: true,
  
  // Set React runtime to fix Edge compatibility
  reactStrictMode: true,
  
  // Increase static page generation timeout
  staticPageGenerationTimeout: 180
};

module.exports = nextConfig;