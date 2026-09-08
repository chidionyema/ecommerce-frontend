import { createServer } from 'https';
import type { ServerOptions } from 'https';
import { parse } from 'url';
import type { UrlWithParsedQuery } from 'url';
import next from 'next';
import fs from 'fs';
import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';

const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const certsDir: string = path.join(process.cwd(), 'certs');
const keyPath: string = path.join(certsDir, 'key.pem');
const certPath: string = path.join(certsDir, 'cert.pem');

const useHttps: boolean = fs.existsSync(keyPath) && fs.existsSync(certPath);

if (!useHttps) {
  console.error('Certificate files not found. Exiting...');
  process.exit(1);
}

const options: ServerOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

app.prepare().then(() => {
  createServer(options, (req: IncomingMessage, res: ServerResponse) => {
    // Set custom headers before handling the request
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' https://js.stripe.com https://www.google.com https://www.gstatic.com; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.googletagmanager.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; " +
        "connect-src 'self' https://api.local.ritualworks.com; " +
        "frame-ancestors 'none';"
    );

    const parsedUrl: UrlWithParsedQuery = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(3001, (err?: Error) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3001');
  });
});
