/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output type for optimal Cloudflare Pages compatibility
  output: 'standalone',
  
  // Enable build cache
  distDir: '.next',
  generateBuildId: async () => {
    return 'build-' + new Date().getTime();
  },
  
  // Image optimization config
  images: {
    unoptimized: true, // Required for Cloudflare Pages
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-cdn.com'
      },
      {
        protocol: 'https',
        hostname: '*.stripe.com'
      }
    ]
  },

  // Security headers
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
      (isProduction
        ? 'https://api.ritualworks.com'
        : 'https://api.local.ritualworks.com');

    const cspDirectives = [
      "default-src 'self'",
      `script-src 'self' ${!isProduction ? "'unsafe-inline' 'unsafe-eval'" : ''} ` +
        "https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
      `style-src 'self' ${!isProduction ? "'unsafe-inline'" : ''} https://fonts.googleapis.com`,
      "img-src 'self' data: https://*.stripe.com https://www.google.com/recaptcha/",
      `connect-src 'self' ${apiUrl} ${!isProduction ? "http://localhost:3000 ws://localhost:3000" : ''} ` +
        "https://checkout.stripe.com https://api.ritualworks.com",
      "frame-src 'self' https://js.stripe.com https://www.google.com/recaptcha/ https://stripe.com",
      "font-src 'self' https://fonts.gstatic.com",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ];

    if (!isProduction) {
      cspDirectives.push("report-uri /api/csp-report");
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
            value: cspDirectives.join('; ').replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  },

  // Webpack configuration with improved chunk splitting
  webpack: (config, { isServer }) => {
    // Add Node.js polyfills and fallbacks for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        net: false,
        tls: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
        zlib: false,
        querystring: false,
        buffer: false,
        util: false
      };
      
      // Improve chunk splitting to reduce bundle size
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        maxSize: 20000000, // 20MB max chunk size (below Cloudflare's 25MB limit)
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the package name
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Handle edge runtime issues with certain packages
    if (isServer) {
      // Exclude problematic packages from the server bundle when using edge runtime
      const edgeRuntime = process.env.NEXT_RUNTIME === 'edge';
      if (edgeRuntime) {
        config.externals = [...(config.externals || []),
          'stripe',
          'micro',
          'raw-body',
          'iconv-lite',
          'safer-buffer'
        ];
      }
    }

    return config;
  },

  // Experimental features
  experimental: {
    esmExternals: true,
    optimizeCss: true, // Always optimize CSS
    scrollRestoration: true,
    swcMinify: true, // Use SWC minifier for better performance
    turbotrace: {
      logLevel: 'error'
    },
    serverComponentsExternalPackages: ['stripe', 'micro'],
  },
  
  // Configure how Next.js handles environment variables
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV || 'development',
  },
  
  // Increase timeout for builds to prevent timeouts on Cloudflare
  staticPageGenerationTimeout: 180, // in seconds
  
  // Improve production performance
  productionBrowserSourceMaps: false,
  
  // Configure redirects if needed
  async redirects() {
    return [];
  }
};

module.exports = nextConfig;