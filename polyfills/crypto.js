// polyfills/crypto.js
const cryptoBrowserify = require('crypto-browserify');

// Create a simple webcrypto mock with essential methods
const webcrypto = {
  getRandomValues: function(buffer) {
    const bytes = cryptoBrowserify.randomBytes(buffer.length);
    buffer.set(new Uint8Array(bytes));
    return buffer;
  },
  subtle: {
    // Add minimal implementation of any needed subtle crypto methods
    digest: async function(algorithm, data) {
      const algo = algorithm.name || algorithm;
      const hash = cryptoBrowserify.createHash(algo.toLowerCase().replace('-', ''));
      hash.update(Buffer.from(data));
      return hash.digest();
    }
  }
};

// Export as a Node.js-like crypto module
module.exports = {
  ...cryptoBrowserify,
  webcrypto,
  // Ensure compatibility with Next-Auth
  randomBytes: cryptoBrowserify.randomBytes,
  createHash: cryptoBrowserify.createHash
};