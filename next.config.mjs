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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },

  output: "export",
  distDir: "out",
  experimental: {
    esmExternals: true,
  },
  images: {
    unoptimized: true, // Required for static exports
    formats: ['image/avif', 'image/webp'], // Added image formats
    remotePatterns: [{
      protocol: 'https',
      hostname: 'your-cdn.com',
    }],
  },

  webpack: (config) => {
    // Only modify CSS handling if needed
    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            url: {
              filter: (url) =>!url.startsWith("/_next/static/media"),
            },
          },
        },
        "postcss-loader",
      ],
    });

    return config;
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }, // Added experimental section
};