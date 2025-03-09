// Save as fs-patcher.js
const Module = require('module');
const originalRequire = Module.prototype.require;

// We'll patch the fs module when it's loaded
Module.prototype.require = function(...args) {
  const result = originalRequire.apply(this, args);
  if (args[0] === 'fs') {
    const fs = result;
    
    // Only patch if not already patched
    if (fs.rename && !fs.rename.patched) {
      const originalRename = fs.rename;
      fs.rename = function(oldPath, newPath, callback) {
        console.log(`⚠️ fs.rename called with: oldPath=${oldPath}, newPath=${newPath}`);
        if (oldPath === undefined || newPath === undefined) {
          console.error('🚨 ERROR DETECTED: fs.rename called with undefined path');
          console.error(new Error().stack);
          // Fail gracefully by using default paths
          oldPath = oldPath || '/tmp/default-old-path';
          newPath = newPath || '/tmp/default-new-path';
        }
        return originalRename.call(this, oldPath, newPath, callback);
      };
      fs.rename.patched = true;
    }
  }
  return result;
};

// Run the Next.js CLI
require('./node_modules/next/dist/bin/next');