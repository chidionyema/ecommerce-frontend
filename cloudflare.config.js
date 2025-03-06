const { withCloudflarePages } = require('@cloudflare/next-on-pages');
const baseConfig = require('./next.config.js');

// Apply specific optimizations for Cloudflare
const cloudflareConfig = {
  ...baseConfig,
  // Override specific options for Cloudflare if needed
};

module.exports = withCloudflarePages(cloudflareConfig);