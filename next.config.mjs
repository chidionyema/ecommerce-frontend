const isProduction = process.env.NODE_ENV === 'production';

// Build the CSP dynamically.
const securityHeaders = () => {
  // Use NEXT_PUBLIC_API_URL if available; otherwise, fallback by environment.
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (isProduction ? 'https://api.ritualworks.com' : 'https://api.local.ritualworks.com');

  // Build the directives. For development, include 'unsafe-inline' and 'unsafe-eval'.
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' ${!isProduction ? "'unsafe-inline' 'unsafe-eval'" : ''} ` +
      "https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
    // Uncomment the following block if you need explicit script-src-elem support:
    // `script-src-elem 'self' ${!isProduction ? "'unsafe-inline' 'unsafe-eval'" : ''} ` +
    //   "https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
    `style-src 'self' ${!isProduction ? "'unsafe-inline'" : ''} https://fonts.googleapis.com`,
    "img-src 'self' data: https://*.stripe.com https://www.google.com/recaptcha/",
    `connect-src 'self' ${apiUrl} ${!isProduction ? "http://localhost:3000 ws://localhost:3000" : ''} ` +
      "https://checkout.stripe.com https://api.ritualworks.com",
    "frame-src 'self' https://js.stripe.com https://www.google.com/recaptcha/ https://stripe.com",
    "font-src 'self' https://fonts.gstatic.com",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ];

  // Optionally add a report URI in development.
  if (!isProduction) {
    cspDirectives.push("report-uri /api/csp-report");
  }

  return [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Content-Security-Policy',
      value: cspDirectives.join('; ').replace(/\s+/g, ' ').trim()
    }
  ];
};

export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders()
      }
    ];
  },

  // Environment-aware configuration.
  output: isProduction ? 'export' : undefined,
  distDir: isProduction ? 'out' : '.next',

  images: {
    unoptimized: isProduction,
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

  webpack: (config) => {
    config.cache = isProduction
      ? {
          type: 'filesystem',
          buildDependencies: {
            config: [__filename]
          }
        }
      : false;

    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: {
              filter: (url) => !url.startsWith('/_next/static/media')
            }
          }
        },
        'postcss-loader'
      ]
    });

    return config;
  },

  experimental: {
    esmExternals: true,
    optimizeCss: isProduction,
    scrollRestoration: true
  }
};
