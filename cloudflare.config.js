const { withCloudflarePages } = require('@cloudflare/next-on-pages');
const baseConfig = require('./next.config.js');

// Keep it simple - just use the base config
module.exports = withCloudflarePages(baseConfig);