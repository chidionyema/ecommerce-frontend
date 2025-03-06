/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output type for optimal Cloudflare Pages compatibility
  output: 'standalone',

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

  // Webpack configuration with polyfills for client-side
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
    }

    // Webpack caching is now enabled (removed explicit disabling)

    return config;
  },

  // Experimental features - removed the invalid 'runtime' option
  experimental: {
    esmExternals: true,
    optimizeCss: process.env.NODE_ENV === 'production',
    scrollRestoration: true
  }
};

module.exports = nextConfig;
