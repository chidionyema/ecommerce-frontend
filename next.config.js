/** @type {import('next').NextConfig} */
const nextConfig = {
  // Change to export mode which is more compatible with Cloudflare
  output: 'export',
  
  // Core settings
  swcMinify: true,
  distDir: '.next',
  staticPageGenerationTimeout: 180,
  productionBrowserSourceMaps: false,

  // Image configuration
  images: {
    unoptimized: true,
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

  // Security headers configuration
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
            value: cspDirectives
              .join('; ')
              .replace(/\s+/g, ' ')
              .trim()
          }
        ]
      }
    ];
  },

  // Webpack configuration optimized for Cloudflare
  webpack: (config, { isServer }) => {
    // Client-side configuration
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

    // Split chunks for both client and server
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 10000,
      maxSize: 20000000, // 20MB to be safe (below 25MB limit)
      cacheGroups: {
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
          name: 'framework',
          priority: 40,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace('@', '')}`;
          },
          priority: 20
        },
        default: {
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    };
    
    return config;
  },

  // Experimental features (minimal)
  experimental: {
    optimizeCss: true
  }
};

module.exports = nextConfig;