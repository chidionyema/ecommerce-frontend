// In custom-server.js
// Make these adjustments:

// 1. Refine the nextConfig to remove warnings
const nextConfig = {
    reactStrictMode: false,
    experimental: {
      // Remove appDir and serverComponents
    },
    webpack: (config, { dev, isServer }) => {
      if (dev && isServer) {
        // Don't override devtool to avoid warnings
        config.infrastructureLogging = { level: 'verbose' };
      }
      return config;
    }
  };