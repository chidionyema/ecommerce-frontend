// next.config.mjs
const isProduction = process.env.NODE_ENV === 'production';

// Build the CSP dynamically
const securityHeaders = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
    (isProduction ? 'https://api.ritualworks.com' : 'https://api.local.ritualworks.com');

  // Rest of your security headers code...
  // ...
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders()
      }
    ];
  },

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
    // Simplify the webpack cache configuration to avoid the URL resolution issues
    config.cache = isProduction
      ? {
          type: 'filesystem',
          // Remove the buildDependencies that's causing issues
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

export default nextConfig;