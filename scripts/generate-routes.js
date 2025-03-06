// scripts/generate-routes.js
const fs = require('fs');
const path = require('path');

const generateRoutesConfig = () => {
  // Cloudflare Pages _routes.json configuration
  const routesConfig = {
    version: 1,
    include: ['/*'],
    exclude: [
      '/build/*',
      '/static/*',
      '/*.ico',
      '/*.js',
      '/*.json',
      '/*.css',
      '/*.png',
      '/*.svg',
      '/*.jpg',
      '/*.jpeg',
      '/*.gif',
      '/*.webp'
    ]
  };

  try {
    // Get the output directory
    const outputDir = path.join(process.cwd(), '.next');
    const routesPath = path.join(outputDir, '_routes.json');

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the routes configuration
    fs.writeFileSync(routesPath, JSON.stringify(routesConfig, null, 2));
    console.log(`_routes.json generated at ${routesPath}`);
  } catch (error) {
    console.error('Failed to generate routes configuration:', error);
    process.exit(1);
  }
};

// Execute the function
generateRoutesConfig();