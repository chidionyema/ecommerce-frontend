/** @type {import('next').NextConfig} */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  compress: true,

  // Enable Next.js image optimization (keeping only webp)
  images: {
    formats: ['image/webp'],
  },

  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (isProduction
        ? 'https://api.ritualworks.com'
        : 'https://api.local.ritualworks.com');

    const cspDirectives = [
      `default-src 'self'`,
      `script-src 'self' ${
        !isProduction ? "'unsafe-inline' 'unsafe-eval'" : ""
      } https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
      `style-src 'self' ${!isProduction ? "'unsafe-inline'" : ""} https://fonts.googleapis.com`,
      `img-src 'self' data: https://*.stripe.com https://www.google.com/recaptcha/`,
      `connect-src 'self' ${apiUrl} ${
        !isProduction ? 'http://localhost:3000 ws://localhost:3000' : ""
      } https://checkout.stripe.com https://api.ritualworks.com`,
      `frame-src 'self' https://js.stripe.com https://www.google.com/recaptcha/ https://stripe.com`,
      `font-src 'self' https://fonts.gstatic.com`,
      `form-action 'self'`,
      `frame-ancestors 'none'`,
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
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      // Disable chunk generation for server bundles
      config.optimization.splitChunks = {
        cacheGroups: { default: false },
      };
    } else {
      // Client-side chunk optimization with aggressive splitting.
      // The maxSize is set to ~244KB (~238KB actual limit) to ensure chunks stay small.
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 244000, // ~244,000 bytes (≈238KB)
        automaticNameDelimiter: '.',
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)/,
            name: 'react-core',
            priority: 50,
            enforce: true,
          },
          mui: {
            test: /[\\/]node_modules[\\/](@mui|@emotion)/,
            name: 'mui-core',
            priority: 45,
            enforce: true,
          },
          next: {
            test: /[\\/]node_modules[\\/](next|@next)/,
            name: 'next-core',
            priority: 40,
            enforce: true,
          },
          ui: {
            test: /[\\/]node_modules[\\/](@headlessui|@heroicons|@radix-ui)/,
            name: 'ui-libs',
            priority: 35,
            enforce: true,
          },
          stripe: {
            test: /[\\/]node_modules[\\/](@stripe)/,
            name: 'stripe',
            priority: 30,
            enforce: true,
          },
          heavy: {
            test: /[\\/]node_modules[\\/](react-google-recaptcha|framer-motion)/,
            name: 'heavy-libs',
            priority: 25,
            enforce: true,
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
            enforce: true,
          },
        },
      };

      if (!dev) {
        config.optimization.usedExports = true;
        config.optimization.sideEffects = true;
      }
    }

    // Set performance limits (not directly limiting chunk size, but a warning threshold)
    config.performance = {
      maxEntrypointSize: 2500000,
      maxAssetSize: 2500000,
    };

    // Polyfill Node.js modules for client builds
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
      };
    }

    // Use null-loader for problematic modules
    config.module.rules.push({
      test: /next[\\/]dist[\\/]esm[\\/]server[\\/]use-cache/,
      use: require.resolve('null-loader'),
    });

    // Null-load specific modules not needed on the client
    config.module.rules.push({
      test: /node_modules[\\\/](react-confetti)/,
      use: 'null-loader',
    });

    // Merge additional alias values with the existing ones (do not override Next.js defaults)
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next/cache': false,
      crypto: path.resolve(__dirname, 'polyfills/crypto.js'),
    };

    return config;
  },

  // Externalize heavy dependencies so they aren’t bundled into the client bundle
  serverExternalPackages: [
    'bufferutil',
    'utf-8-validate',
    'sharp',
    '@prisma/client',
    'next/dist/compiled/etag',
    'next/dist/server/lib/squoosh',
    'next/dist/server/image-optimizer',
  ],

  experimental: {
    optimizeCss: true,
    disableOptimizedLoading: process.env.NODE_ENV === 'development',
  },

  trailingSlash: true,
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
};

module.exports = withBundleAnalyzer(nextConfig);
