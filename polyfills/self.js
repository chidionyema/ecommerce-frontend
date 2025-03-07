// Shim for 'self' reference in server context
global.self = global.self || {
  crypto: require('crypto').webcrypto,
  location: {}
};