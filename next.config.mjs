// next.config.mjs
const nextConfig = {
  output: 'export',
  distDir: 'out',
  experimental: {
    esmExternals: true,
  },
  images: {
    unoptimized: true, // Required for static exports
  },
  webpack: (config) => {
    // Only modify CSS handling if you have specific needs
    // Consider removing this entire webpack block if using standard CSS modules
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: {
              filter: (url) => !url.startsWith('/_next/static/media'),
            },
          },
        },
        'postcss-loader',
      ],
    });

    return config;
  },
};

export default nextConfig;