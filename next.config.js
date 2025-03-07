/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 180,

  images: {
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

  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
      (isProduction
        ? 'https://api.ritualworks.com'
        : 'https://api.local.ritualworks.com');

    const cspDirectives = [
      `default-src 'self'`,
      `script-src 'self' ${!isProduction ? "'unsafe-inline' 'unsafe-eval'" : ''}`
        + ` https://apis.google.com https://js.stripe.com`
        + ` https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
      `style-src 'self' ${!isProduction ? "'unsafe-inline'" : ''} https://fonts.googleapis.com`,
      `img-src 'self' data: https://*.stripe.com https://www.google.com/recaptcha/`,
      `connect-src 'self' ${apiUrl} ${!isProduction ? 'http://localhost:3000 ws://localhost:3000' : ''}`
        + ` https://checkout.stripe.com https://api.ritualworks.com`,
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
            value: cspDirectives.join('; ').replace(/\s+/g, ' ').trim(),
          }
        ]
      }
    ];
  },

  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      config.output.globalObject = 'this';
    }

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

    if (!dev && !isServer) {
      config.cache = false;
    }

    config.module.rules.push({
      test: /node_modules[\\\/](stripe|micro|iconv-lite|safer-buffer)[\\\/]/,
      use: 'null-loader',
    });

    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        framework: {  // <--  FRAMEWORK CACHE GROUP - **UNCOMMENTED** for Test 7
          test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
          name: 'framework',
          priority: 40,
          enforce: true,
        },                      // <--  FRAMEWORK CACHE GROUP - **UNCOMMENTED** for Test 7
        vendor: {              // <--  VENDOR CACHE GROUP - **COMMENTED OUT**
          // test: /[\\/]node_modules[\\/]/,
          // name(module) {
          //   if (!module.context) return 'vendor';
          //   const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
          //   return match && match[1] ? `vendor.${match[1].replace('@', '')}` : 'vendor';
          // },
          // priority: 20,
        },                     // <--  VENDOR CACHE GROUP - **COMMENTED OUT**
        default: {             // <--  DEFAULT CACHE GROUP - **COMMENTED OUT**
          // minChunks: 2,
          // priority: 10,
          // reuseExistingChunk: true,
        },                    // <--  DEFAULT CACHE GROUP - **COMMENTED OUT**
      },
    };

    // if (!dev && !isServer) {
    //   config.cache = false;
    // }

    return config;
  },

  experimental: {
    optimizeCss: true
  }
};

module.exports = nextConfig;