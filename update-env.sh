#!/bin/bash
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
sed -i "s|^ALLOWED_HOSTS=.*|ALLOWED_HOSTS=$PUBLIC_IP,localhost,127.0.0.1|" .env
sed -i "s|^CORS_ALLOWED_ORIGINS=.*|CORS_ALLOWED_ORIGINS=http://$PUBLIC_IP,http://$PUBLIC_IP:80|" .env
sed -i "s|^VITE_API_URL=.*|VITE_API_URL=http://$PUBLIC_IP/car-store/api/v1/|" .env
echo "✅ .env actualizado con IP: $PUBLIC_IP"

