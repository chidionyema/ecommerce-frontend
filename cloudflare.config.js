const { withCloudflarePages } = require('@cloudflare/next-on-pages');
const baseConfig = require('./next.config.js');

module.exports = withCloudflarePages(baseConfig);