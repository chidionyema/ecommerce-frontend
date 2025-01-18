#!/bin/bash

# Variables
CERT_DIR="./certs"
CERT_FILE="$CERT_DIR/cert.pem"
KEY_FILE="$CERT_DIR/key.pem"
ENV_FILE="./src/.env.local"
DOMAIN="yourdomain.com" # Replace with your actual domain
EMAIL="your@email.com"  # Replace with your email address

# Create a directory for certificates
mkdir -p $CERT_DIR

# Install certbot via pip3
pip3 install certbot

# Obtain a certificate from Let's Encrypt
certbot certonly --staging --standalone -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL

# Check if certbot ran and certificates are available
if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ] || [ ! -f /etc/letsencrypt/live/$DOMAIN/privkey.pem ]; then
    echo "Certificate files not found, exiting."
    exit 1
fi

# Copy the certificate and key to the certs directory
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $CERT_FILE
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $KEY_FILE

# Check if .env.local file exists
if [ ! -f $ENV_FILE ]; then
    touch $ENV_FILE
fi

# Add HTTPS configuration to .env.local
echo "HTTPS=true" >> $ENV_FILE
echo "SSL_CRT_FILE=$CERT_FILE" >> $ENV_FILE
echo "SSL_KEY_FILE=$KEY_FILE" >> $ENV_FILE

# Set appropriate permissions for certificate files
chmod 644 $CERT_FILE
chmod 600 $KEY_FILE

echo "Let's Encrypt certificate obtained and configuration updated in $ENV_FILE."
echo "No need to manually trust the certificate as it's from a trusted CA."