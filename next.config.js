/** @type {import('next').NextConfig} */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  compress: true,
  
  // Enable Next.js image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
  },
  
  // Font optimization
  optimizeFonts: true,
  
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
      (isProduction ? 'https://api.ritualworks.com' : 'https://api.local.ritualworks.com');
    
    // Generate a nonce for inline scripts in production
    const generateNonce = () => {
      return isProduction ? `'nonce-${Buffer.from(crypto.randomBytes(16)).toString('base64')}'` : '';
    };
    
    const scriptNonce = generateNonce();
    
    const cspDirectives = [
      `default-src 'self'`,
      `script-src 'self' ${scriptNonce} ${!isProduction ? "'unsafe-inline' 'unsafe-eval'" : ''} https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
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
          { key: 'Content-Security-Policy', value: cspDirectives.join('; ').trim() },
          // Add Font preload headers
          { key: 'Link', value: '<https://fonts.googleapis.com>; rel=preconnect' },
          { key: 'Link', value: '<https://fonts.gstatic.com>; rel=preconnect; crossorigin' }
        ]
      }
    ];
  },

  webpack: (config, { isServer, dev }) => {
    // Server-specific optimizations
    if (isServer) {
      // Disable chunk generation for server
      config.optimization.splitChunks = {
        cacheGroups: { default: false }
      };
    } else {
      // Client-side chunk optimization
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 1000000,
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)/,
            name: 'react-core',
            priority: 50
          },
          mui: {
            test: /[\\/]node_modules[\\/](@mui|@emotion)/,
            name: 'mui-core',
            priority: 45
          },
          next: {
            test: /[\\/]node_modules[\\/](next|@next)/,
            name: 'next-core',
            priority: 40
          },
          ui: {
            test: /[\\/]node_modules[\\/](@headlessui|@heroicons|@radix-ui)/,
            name: 'ui-libs',
            priority: 35
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
      
      // Enhanced tree-shaking for production
      if (!dev) {
        config.optimization.usedExports = true;
        config.optimization.sideEffects = true;
        
        // Terser optimization options
        if (config.optimization.minimizer) {
          const terserIndex = config.optimization.minimizer.findIndex(
            minimizer => minimizer.constructor.name === 'TerserPlugin'
          );
          
          if (terserIndex >= 0) {
            config.optimization.minimizer[terserIndex].options.terserOptions = {
              ...config.optimization.minimizer[terserIndex].options.terserOptions,
              compress: {
                ...config.optimization.minimizer[terserIndex].options.terserOptions?.compress,
                drop_console: true,
                pure_funcs: ['console.debug', 'console.info', 'console.log'],
              },
              mangle: true
            };
          }
        }
      }
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

    // Add null-loader for problematic/large modules
    config.module.rules.push({
      test: /next[\\/]dist[\\/]esm[\\/]server[\\/]use-cache/,
      use: require.resolve('null-loader')
    });

    // Use dynamic imports instead of null-loader for large modules
    // Commented out null-loader approach
    /*
    config.module.rules.push({
      test: /node_modules[\\\/](stripe|micro|@stripe|react-confetti|framer-motion)/,
      use: 'null-loader',
    });
    */

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
    '@prisma/client',
    'next/dist/compiled/etag',
    'next/dist/server/lib/squoosh',
    'next/dist/server/image-optimizer'
  ],
  
  experimental: {
    optimizeCss: true,
    disableOptimizedLoading: process.env.NODE_ENV === 'development',
    // Enable Incremental Static Regeneration features
    isrMemoryCacheSize: 50,
    isrFlushToDisk: true
  },
  
  trailingSlash: true,
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
  
  // Add Incremental Static Regeneration default config
  // This can be overridden at the page level
  unstable_runtimeJS: true,
  unstable_JsPreload: true
};

module.exports = withBundleAnalyzer(nextConfig);