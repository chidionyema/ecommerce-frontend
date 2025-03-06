const fs = require('fs');
const path = require('path');

const routesConfig = {
  version: 1,
  include: ['/*'],
  exclude: []
};

const outputDir = path.join(process.cwd(), '.next');

if (!fs.existsSync(outputDir)) {
  console.error('Error: Output directory .next does not exist.');
  process.exit(1);
}

const routesPath = path.join(outputDir, '_routes.json');
fs.writeFileSync(routesPath, JSON.stringify(routesConfig, null, 2));
console.log(`_routes.json generated in ${outputDir}`);
