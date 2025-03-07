/** @type {import('next').NextConfig} */
const nextConfig = {
  // Switch back to standalone mode but with better configuration
  output: 'standalone',
  
  // Core settings
  distDir: '.next',
  staticPageGenerationTimeout: 180,
  productionBrowserSourceMaps: false,

  // Image configuration
  images: {
    unoptimized: true,
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

  // Keep your security headers configuration
  async headers() {
    // Your existing headers code
  },

  // Webpack configuration with fixes for both issues
  webpack: (config, { isServer }) => {
    // Client-side configuration
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        http: false,
        https: false,
        stream: false,
        crypto: false
      };
    } else {
      // Fix for self is not defined - exclude problematic packages
      config.externals = [...(config.externals || []), 
        'stripe',
        'micro',
        'raw-body',
        'iconv-lite',
        'safer-buffer'
      ];
    }

    // Split chunks config
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 10000,
      maxSize: 20000000, // 20MB to be safe
      cacheGroups: {
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
          name: 'framework',
          priority: 40,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: function(module) {
            // Fix for the first error
            if (!module.context) return 'vendor';
            const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            return match && match[1] ? `vendor.${match[1].replace('@', '')}` : 'vendor';
          },
          priority: 20
        },
        default: {
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    };
    
    return config;
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    // This can help with Edge runtime issues
    serverComponentsExternalPackages: ['stripe', 'micro'],
    
    // Add this to prevent loading certain modules in edge runtime
    serverRuntimeCompat: true
  }
};

module.exports = nextConfig;