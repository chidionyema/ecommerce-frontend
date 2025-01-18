# Stage 1: Builder
FROM node:18 AS builder

WORKDIR /app

# Copy only package files for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Install OpenSSL and other required tools
RUN apk add --no-cache openssl

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy built files and necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy server.js
COPY server.js ./server.js

# Create certs directory
RUN mkdir -p /app/certs

EXPOSE 3001

CMD ["npm", "start"]