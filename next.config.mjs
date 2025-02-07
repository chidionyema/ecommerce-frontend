// next.config.mjs

export default {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
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
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; frame-ancestors 'none';",
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
    // Enable filesystem caching with buildDependencies set to the current config file’s pathname.
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [new URL(import.meta.url).pathname],
      },
    };

    // Add a custom CSS handling rule (this disables the built-in CSS support)
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
