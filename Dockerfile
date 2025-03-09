# Dockerfile (for local development only)
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "dev"]