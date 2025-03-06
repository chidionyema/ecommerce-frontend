// File: auth-service/index.js
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const next = require('next');
const helmet = require('helmet'); // For security headers
const rateLimit = require('express-rate-limit'); // For rate limiting
const ipRangeCheck = require('ip-range-check'); // For IP range checking

// Get environment variables with fallbacks
const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3001;

// Configure allowed origins for CORS
const parseAllowedOrigins = () => {
  // Default to development origin if not specified
  if (!process.env.ALLOWED_ORIGINS && isDev) {
    return ['http://localhost:3000'];
  }
  
  // Parse comma-separated origins from environment variable
  return process.env.ALLOWED_ORIGINS ? 
    process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) : 
    ['*']; // Fallback to allow all in case nothing is specified (not recommended for production)
};

const allowedOrigins = parseAllowedOrigins();

// Cloudflare IP ranges (update these periodically)
// https://www.cloudflare.com/ips/
const cloudflareIPv4Ranges = [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14'
];

const cloudflareIPv6Ranges = [
  '2400:cb00::/32',
  '2606:4700::/32',
  '2803:f800::/32',
  '2405:b500::/32',
  '2405:8100::/32',
  '2a06:98c0::/29',
  '2c0f:f248::/32'
];

// Add development IPs from environment or defaults
const parseAllowedIPs = () => {
  // Default development IPs
  const defaultIPs = ['127.0.0.1', '::1'];
  
  // Parse comma-separated IPs from environment variable
  return process.env.ALLOWED_IPS ? 
    [...defaultIPs, ...process.env.ALLOWED_IPS.split(',').map(ip => ip.trim())] : 
    defaultIPs;
};

const allowedIPs = parseAllowedIPs();

// Create a minimal Next.js app just for auth routes
const app = next({
  dev: isDev,
  conf: {
    distDir: '.next',
    // Configure only what's needed for auth
    publicRuntimeConfig: {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
  },
});

const handle = app.getRequestHandler();

// IP verification middleware
const verifyIPAccess = (req, res, next) => {
  // Skip verification in development mode
  if (isDev) {
    return next();
  }
  
  const clientIP = req.ip || 
                   req.headers['x-forwarded-for'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress;
  
  // Allow specific IPs
  if (allowedIPs.includes(clientIP)) {
    return next();
  }
  
  // Check if IP is in Cloudflare range
  const isCloudflareIP = cloudflareIPv4Ranges.some(range => ipRangeCheck(clientIP, range)) || 
                         cloudflareIPv6Ranges.some(range => ipRangeCheck(clientIP, range));
  
  if (isCloudflareIP) {
    // Verify Cloudflare headers if coming from Cloudflare
    const cfConnectingIP = req.headers['cf-connecting-ip'];
    const cfRay = req.headers['cf-ray'];
    
    if (cfConnectingIP && cfRay) {
      return next();
    }
  }
  
  // Log blocked access attempts for security monitoring
  console.warn(`Blocked access attempt from IP: ${clientIP}`);
  
  // If IP is not allowed, return 403 Forbidden
  return res.status(403).json({ 
    error: 'Access denied', 
    message: 'Your IP address is not authorized to access this service' 
  });
};

// Configure rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: 'Too many requests, please try again later.' }
});

app.prepare().then(() => {
  const server = express();
  
  // Apply basic security headers
  server.use(helmet({
    contentSecurityPolicy: false, // Next.js handles CSP
    crossOriginEmbedderPolicy: false, // To allow Next.js to work properly
  }));
  
  // Parse JSON bodies
  server.use(express.json());
  
  // Enable CORS with strict options
  server.use(cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is allowed
      if (allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      
      return callback(null, true);
    },
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'OPTIONS'], // Restrict to methods needed for auth
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }));
  
  // Apply IP verification for all routes 
  server.use(verifyIPAccess);
  
  // Apply rate limiting to auth routes
  server.use('/api/auth', apiLimiter);
  
  // Handle auth routes with Next.js
  server.all('/api/auth/*', (req, res) => {
    // Log auth attempts for audit (don't log sensitive data)
    if (req.method === 'POST') {
      console.info(`Auth attempt: ${req.url} from ${req.ip}`);
    }
    
    return handle(req, res);
  });
  
  // Simple health check
  server.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  // Handle all other routes as 404
  server.all('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
  
  // Create HTTP server with increased timeout for auth operations
  const httpServer = createServer(server);
  httpServer.timeout = 30000; // 30 seconds
  
  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Auth service ready on http://localhost:${port}`);
    console.log(`> Environment: ${process.env.NODE_ENV}`);
    console.log(`> Allowed origins: ${allowedOrigins.join(', ')}`);
    if (isDev) {
      console.log('> Running in development mode - security restrictions relaxed');
    }
  });
});