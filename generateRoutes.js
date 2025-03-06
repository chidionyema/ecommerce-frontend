const fs = require('fs');
const path = require('path');

// Define the routes you want to include.
// This is a basic example; you may need to customize it.
const routesConfig = {
  version: 1,
  include: ['/*'],
  exclude: []
};

// Define the path to your .next folder
const outputDir = path.join(__dirname, '.next');

// Write the _routes.json file
fs.writeFileSync(
  path.join(outputDir, '_routes.json'),
  JSON.stringify(routesConfig, null, 2)
);

console.log('_routes.json generated in', outputDir);
