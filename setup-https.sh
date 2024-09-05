#!/bin/bash

# Variables
CERT_DIR="./certs"
CERT_FILE="$CERT_DIR/cert.pem"
KEY_FILE="$CERT_DIR/key.pem"
ENV_FILE="./src/.env.local"

# Create a directory for certificates
mkdir -p $CERT_DIR

# Generate a self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout $KEY_FILE -out $CERT_FILE -days 365 -nodes -subj "/CN=localhost"

# Check if .env.local file exists
if [ ! -f $ENV_FILE ]; then
    touch $ENV_FILE
fi

# Add HTTPS configuration to .env.local
echo "HTTPS=true" >> $ENV_FILE
echo "SSL_CRT_FILE=$CERT_FILE" >> $ENV_FILE
echo "SSL_KEY_FILE=$KEY_FILE" >> $ENV_FILE

echo "Self-signed certificate generated and configuration updated in $ENV_FILE."
echo "Please trust the certificate in your browser if you haven't done so."

# Instructions to trust the certificate
echo "On macOS, you can trust the certificate by running the following command:"
echo "sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $CERT_FILE"


