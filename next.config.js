/** @type {import('next').NextConfig} */
const path = require('path');
const { execSync } = require('child_process');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Tells Next.js to produce a standalone build.
  output: 'export',
  distDir: 'out',  

  // Don't generate browser source maps in production.
  productionBrowserSourceMaps: false,

  // Compress output assets
  compress: true,

  // Enable Next.js image optimization with WebP
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },



  // Build CSP and security headers
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (isProduction
        ? 'https://api.ritualworks.com'
        : 'https://api.local.ritualworks.com');

    // Use arrays for each directive to ensure proper spacing when joined.
    const scriptSources = [
      "'self'",
      ...(isProduction ? [] : ["'unsafe-inline'", "'unsafe-eval'"]), // Ensure 'unsafe-eval' in dev
      'https://apis.google.com',
      'https://js.stripe.com',
      'https://www.google.com/recaptcha/',
      'https://www.gstatic.com/recaptcha/',
    ];

    const styleSources = [
      "'self'",
      // Include unsafe-inline in development to accommodate HMR, etc.
      ...(!isProduction ? ["'unsafe-inline'"] : []),
      'https://fonts.googleapis.com',
    ];

    const connectSources = [
      "'self'",
      apiUrl,
      // Add localhost and ws in development for HMR
      ...(!isProduction
        ? ['http://localhost:3000', 'ws://localhost:3000', 'http://localhost:3001', 'ws://localhost:3001']
        : []),
      'https://checkout.stripe.com',
      // If production, include your production API URL explicitly as well
      ...(isProduction ? ['https://api.ritualworks.com'] : []),
    ];

    // Put them all together into one CSP string.
    const cspDirectives = [
      `default-src 'self'`,
      `script-src ${scriptSources.join(' ')}`,
      `style-src ${styleSources.join(' ')}`,
      `img-src 'self' data: https://*.stripe.com https://www.google.com/recaptcha/`,
      `connect-src ${connectSources.join(' ')}`,
      `frame-src 'self' https://js.stripe.com https://www.google.com/recaptcha/ https://stripe.com`,
      `font-src 'self' https://fonts.gstatic.com`,
      `form-action 'self'`,
      // Deny framing from all external origins
      `frame-ancestors 'none'`,
    ];

    // For development, optionally add a CSP reporting endpoint
    if (!isProduction) {
      cspDirectives.push('report-uri /api/csp-report');
    }

    return [
      {
        source: '/(.*)',
        headers: [
          // X-Frame-Options
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives.join('; '),
          },
        ],
      },
    ];
  },

  // Your existing Webpack config, chunk splitting, etc.
  webpack: (config, { isServer, dev }) => {
    // Add filesystem cache configuration
    config.cache = {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.tmp/webpack-cache'),
      buildDependencies: {
        config: [__filename]
      }
    };
    
    //
    // Example advanced Webpack configuration
    //
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)/,
            name: 'react-core',
            priority: 50,
          },
          mui: {
            test: /[\\/]node_modules[\\/](@mui|@emotion)/,
            name: 'mui-core',
            priority: 45,
          },
          next: {
            test: /[\\/]node_modules[\\/](next|@next)/,
            name: 'next-core',
            priority: 40,
          },
          ui: {
            test: /[\\/]node_modules[\\/](@headlessui|@heroicons|@radix-ui)/,
            name: 'ui-libs',
            priority: 35,
          },
          stripe: {
            test: /[\\/]node_modules[\\/](@stripe)/,
            name: 'stripe',
            priority: 30,
          },
          heavy: {
            test: /[\\/]node_modules[\\/](react-google-recaptcha|framer-motion)/,
            name: 'heavy-libs',
            priority: 25,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return `vendor.${packageName?.replace('@', '') || 'misc'}`;
            },
            priority: 20,
          },
        },
      };

      if (!dev) {
        config.optimization.usedExports = true;
        config.optimization.sideEffects = true;
      }

      config.resolve.fallback = {
        fs: false,
        path: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
      };
    }

    config.performance = {
      maxEntrypointSize: 2500000,
      maxAssetSize: 2500000,
    };

    config.module.rules.push({
      test: /next[\\/]dist[\\/]esm[\\/]server[\\/]use-cache/,
      use: require.resolve('null-loader'),
    });

    config.module.rules.push({
      test: /node_modules[\\/](react-confetti)/,
      use: 'null-loader',
    });

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next/cache': false,
      crypto: path.resolve(__dirname, 'polyfills/crypto.js'),
    };

    return config;
  },

  serverExternalPackages: [
    'bufferutil',
    'utf-8-validate',
    'sharp',
    '@prisma/client',
    'next/dist/compiled/etag',
    'next/dist/server/lib/squoosh',
    'next/dist/server/image-optimizer',
    'elliptic',
    'asn1.js',
    'jose',
    'openid-client',
    'diffie-hellman',
    'public-encrypt',
    'create-ecdh',
    'miller-rabin',
    'bn.js',
  ],

  experimental: {
    optimizeCss: true,
    disableOptimizedLoading: process.env.NODE_ENV === 'development',
    // Add this experimental flag
    externalDir: true
  },
  
  outputFileTracingExcludes: {
    '*': [
      // Enhanced exclusions
      '**/*.map',
      '**/webpack/cache/**',
      '**/cache/**',
      '**/.next/cache/**',
      'node_modules/**/@swc',
      'node_modules/**/@swc/core',
      'node_modules/**/esbuild',
      'node_modules/**/webpack'
    ]
  },

  trailingSlash: true,
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
};

module.exports = withBundleAnalyzer(nextConfig);