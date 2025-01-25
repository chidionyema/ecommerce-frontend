import postcss from 'postcss';

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    esmExternals: 'loose', // ⚠ Consider removing this as per the Next.js warning
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            esModule: false,
            url: {
              filter: (url) => !url.startsWith('/_next/static/media'),
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            implementation: postcss, // ✅ Use ES module import instead of require
          },
        },
      ],
    });

    return config;
  },
};

export default config;
