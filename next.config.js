/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 180,
  
  // Reduce image optimization options
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-cdn.com'
      }
    ],
    imageSizes: [16, 32, 48, 64]
  },
  
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
  
  webpack: (config, { dev, isServer }) => {
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
    
    // Null loader for problematic modules
    config.module.rules.push({
      test: /node_modules[\\\/](stripe|micro|iconv-lite|safer-buffer)[\\\/]/,
      use: 'null-loader',
    });
    
    // Optimize chunks for Cloudflare Pages
    config.optimization = {
      minimize: true,
      minimizer: [
        // Keep existing minimizers
        ...config.optimization.minimizer || []
      ],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 2000000, // Reduced from 20MB to 2MB
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            chunks: 'all',
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            priority: 30,
            minChunks: 2,
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name: false,
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          }
        }
      }
    };
    
    return config;
  },
  
  // Fix for Edge Runtime warnings
  experimental: {
    disableOptimizedLoading: true, // Added this to fix Edge Runtime warning
    optimizeCss: false
  },
  
  // Set React runtime to fix Edge compatibility
  reactStrictMode: true,
  
  // Add output configuration for smaller files
  output: 'standalone'
};

module.exports = nextConfig; 