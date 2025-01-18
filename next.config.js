import fs from 'fs';
import path from 'path';

const certsDir = path.join(process.cwd(), 'certs');
const keyPath = path.join(certsDir, 'key.pem');
const certPath = path.join(certsDir, 'cert.pem');

const useHttps = fs.existsSync(keyPath) && fs.existsSync(certPath);

console.log('useHttps:', useHttps);
console.log('keyPath:', keyPath);
console.log('certPath:', certPath);
console.log('key exists:', fs.existsSync(keyPath));
console.log('cert exists:', fs.existsSync(certPath));

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;