const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Important for Cloudflare Pages
  images: {
    unoptimized: true, // Required for 'export' mode
    domains: [
      // Add your image domains here
      'example.com',
      'images.example.com'
    ],
  },
  // Remove or comment out experimental edge runtime options if present
  experimental: {
    // Remove any edge runtime related experimental features
    optimizeCss: true, // You can keep this one
    // appDir: true,  // Comment out if present
  },
  // This ensures environment variables are properly passed
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    API_WEBHOOK_KEY: process.env.API_WEBHOOK_KEY,
  },
};

module.exports = nextConfig;
