// File: server.js
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');
const validator = require('validator');

// Environment configuration
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.yourbackend.com';

// Logging configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// If not in production, log to console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

async function createServer() {
  const app = next({ dev });
  const handle = app.getRequestHandler();

  await app.prepare();

  const server = express();

  // Middleware to remove powered-by header and add security headers
  server.disable('x-powered-by');

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Global rate limiting
  server.use(limiter);

  // Helmet for security headers
  server.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", BACKEND_API_URL],
      },
    },
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin'
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: {
      action: 'deny'
    }
  }));

  // Input validation middleware
  const validateRequest = (req, res, next) => {
    // Sanitize and validate path
    const sanitizedPath = validator.escape(req.path);
    
    // Block potential path traversal or malicious inputs
    if (sanitizedPath !== req.path) {
      logger.warn(`Potential path traversal attempt: ${req.path}`);
      return res.status(400).json({ error: 'Invalid request path' });
    }

    // Limit request body size
    if (req.body && Object.keys(req.body).length > 0) {
      const bodySize = Buffer.byteLength(JSON.stringify(req.body));
      if (bodySize > 10240) { // 10KB limit
        logger.warn(`Oversized request body: ${bodySize} bytes`);
        return res.status(413).json({ error: 'Request entity too large' });
      }
    }

    next();
  };

  // Logging middleware
  server.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    colorize: false,
    requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query'],
    responseWhitelist: ['statusCode']
  }));

  // CORS configuration
  const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = process.env.ALLOWED_ORIGINS 
        ? process.env.ALLOWED_ORIGINS.split(',') 
        : ['http://localhost:3000'];
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`Blocked CORS request from: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600 // 10 minutes
  };
  server.use(cors(corsOptions));

  // Body parsing with size limit
  server.use(express.json({ 
    limit: '10kb' // Prevent large payload attacks
  }));

  // Apply input validation
  server.use(validateRequest);

  // Proxy API requests to backend
  server.use('/api', createProxyMiddleware({
    target: BACKEND_API_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api' // remove /api prefix if needed
    },
    onProxyReq: (proxyReq, req) => {
      // Add forwarded headers
      proxyReq.setHeader('X-Forwarded-For', req.ip);
      proxyReq.setHeader('X-Real-IP', req.ip);
      
      // Optionally log proxy requests (without sensitive data)
      logger.info({
        message: 'Proxying request',
        method: req.method,
        path: req.path,
        ip: req.ip
      });
    },
    onError: (err, req, res) => {
      logger.error({
        message: 'Proxy Error',
        error: err,
        method: req.method,
        path: req.path
      });
      res.status(500).json({ error: 'Proxy failed' });
    }
  }));

  // Health check endpoint
  server.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  });

  // Error handling middleware
  server.use((err, req, res, next) => {
    logger.error({
      message: 'Unhandled Error',
      error: err,
      method: req.method,
      path: req.path
    });

    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message
    });
  });

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const httpServer = server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`Server ready on http://localhost:${port}`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    logger.info(`Received ${signal}. Shutting down gracefully.`);
    httpServer.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });

    // Force close server after 10 seconds
    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  return server;
}

// Export for Cloudflare Pages
module.exports = createServer();