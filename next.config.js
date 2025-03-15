import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core settings
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  
  // Explicitly define which extensions to use for pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Disable auto pre-rendering in development
  devIndicators: {
    autoPrerender: false,
  },
  
  // Image optimization
  images: {
    domains: ['ritualworks.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.local.ritualworks.com',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://api.local.ritualworks.com/',
    NEXT_PUBLIC_CSP_NONCE: process.env.NEXT_PUBLIC_CSP_NONCE || '',
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || '',
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  },
  
  // Webpack optimization (simplified)
  webpack: (config, { isServer, dev }) => {
    // Create a new module rule to ignore specific directories
    config.module.rules.push({
      test: /[\\/](pages_backup|pages_old)[\\/]/,
      use: 'ignore-loader',
    });

    config.cache = {
      type: 'filesystem',
      version: `${process.env.NODE_ENV || 'development'}-1`,
      cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
      buildDependencies: {
        config: [__filename]
      }
    };
    
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 244000,
      };
    }
    
    config.resolve.fallback = {
      fs: false,
      path: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
    };
    
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [
        path.resolve(__dirname, 'node_modules')
      ],
    };
    
    return config;
  },
  
  // Disable Fast Refresh
  experimental: {
  },
  
  // Adjust onDemandEntries settings for development
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  
  // Increase timeout for static generation
  staticPageGenerationTimeout: 180,

  basePath: '', // **** ADDED basePath: '' ****
};

export default nextConfig;