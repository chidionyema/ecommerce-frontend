import https from 'https';
import fs from 'fs';
import path from 'path';

const certsDir = path.join(process.cwd(), 'certs');
const keyPath = path.join(certsDir, 'key.pem');
const certPath = path.join(certsDir, 'cert.pem');

const useHttps = fs.existsSync(keyPath) && fs.existsSync(certPath);

if (!useHttps) {
  console.error('Certificate files not found. Exiting...');
  process.exit(1);
}

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, HTTPS!');
});

server.listen(3002, () => {
  console.log('HTTPS server running on https://localhost:3002');
});