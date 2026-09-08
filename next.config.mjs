/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Or 'SAMEORIGIN' if embedding is required
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' https://js.stripe.com https://www.google.com https://www.gstatic.com; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.googletagmanager.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data:; " +
              // Combined connect-src directive:
             "connect-src 'self' https://api.local.ritualworks.com ws://localhost:3000/; " + 
              "frame-ancestors 'none';",
          },
        ],
      },
    ];
  },

  // Configure Next.js for static export
  output: "export",
  distDir: "out",

  // Images configuration
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-cdn.com',
      },
    ],
  },

  // Explicit webpack caching configuration
  webpack: (config) => {
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [new URL(import.meta.url).pathname],
      },
    };

    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            url: {
              filter: (url) => !url.startsWith("/_next/static/media"),
            },
          },
        },
        "postcss-loader",
      ],
    });

    return config;
  },

  experimental: {
    esmExternals: true,
    optimizeCss: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
