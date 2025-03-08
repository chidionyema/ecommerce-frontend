/** @type {import('next').NextConfig} */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Tells Next.js to produce a standalone build (which is good for Cloudflare Pages + next-on-pages).
  output: 'standalone',
a
  // Don't generate browser source maps in production (reduces final build size).
  productionBrowserSourceMaps: false,

  // Compress output assets
  compress: true,

  // Enable Next.js image optimization with webp
  images: {
    formats: ['image/webp'],
  },

  // Example custom security headers
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

    // For non-production, add a CSP report URI
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
    //
    // 1) Remove forcing server into a single chunk
    //    This prevents a massive "0.pack" from merging everything.
    //
    //    If you need a truly minimal server bundle, you can do advanced tweaks,
    //    but on Cloudflare Pages, it's safer to let Next's defaults handle chunking.
    //

    // 2) Fine-tune client chunking rules:
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 244000, // ~238 KB per chunk (helps stay within 25MB total limit on CF)
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

      // Enhanced tree-shaking for production
      if (!dev) {
        config.optimization.usedExports = true;
        config.optimization.sideEffects = true;
      }

      // Node.js polyfills for client
      config.resolve.fallback = {
        fs: false,
        path: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
      };
    }

    // 3) Keep performance limits
    config.performance = {
      maxEntrypointSize: 2500000, // ~2.5 MB per entry
      maxAssetSize: 2500000,      // ~2.5 MB per asset
    };

    //
    // 4) Null-loader for big or server-only modules that are not needed in the browser
    //
    config.module.rules.push({
      test: /next[\\/]dist[\\/]esm[\\/]server[\\/]use-cache/,
      use: require.resolve('null-loader'),
    });

    config.module.rules.push({
      test: /node_modules[\\/](react-confetti)/,
      use: 'null-loader',
    });

    //
    // 5) Fix crypto polyfill references
    //
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next/cache': false,
      crypto: path.resolve(__dirname, 'polyfills/crypto.js'),
    };

    return config;
  },

  //
  // 6) Externalize heavy dependencies from the server bundle
  //    (only works if they're NOT imported in client code)
  //
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
  },

  trailingSlash: true,
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
};

module.exports = withBundleAnalyzer(nextConfig);
