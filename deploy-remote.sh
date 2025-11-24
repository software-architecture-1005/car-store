#!/bin/bash
# Script para ejecutar en la instancia EC2
# Este script automatiza todo el despliegue

set -e

echo "🚀 Iniciando despliegue automático de Car Store..."

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Obtener IP pública
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)

echo -e "${GREEN}📍 IP Pública: $PUBLIC_IP${NC}"

# Actualizar sistema
echo -e "${YELLOW}📦 Actualizando sistema...${NC}"
sudo yum update -y

# Instalar Git
echo -e "${YELLOW}📦 Instalando Git...${NC}"
sudo yum install git -y

# Instalar Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}🐳 Instalando Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker ec2-user
    sudo systemctl enable docker
    sudo systemctl start docker
    rm get-docker.sh
else
    echo -e "${GREEN}✅ Docker ya está instalado${NC}"
fi

# Instalar Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}🐳 Instalando Docker Compose...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo -e "${GREEN}✅ Docker Compose ya está instalado${NC}"
fi

# Verificar instalaciones
echo -e "${GREEN}✅ Verificando instalaciones...${NC}"
docker --version
docker-compose --version

# Si el repositorio no está clonado, pedir URL
if [ ! -d "car-store" ]; then
    echo -e "${YELLOW}📥 Por favor, clona el repositorio manualmente:${NC}"
    echo "   git clone https://github.com/[tu-usuario]/car-store.git"
    echo "   cd car-store"
    exit 1
fi

cd car-store

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚙️  Creando archivo .env...${NC}"
    cp .env.example .env
    
    # Generar SECRET_KEY
    SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(50))" 2>/dev/null || openssl rand -base64 50)
    
    # Actualizar .env con valores
    sed -i "s|SECRET_KEY=.*|SECRET_KEY=$SECRET_KEY|g" .env
    sed -i "s|ALLOWED_HOSTS=.*|ALLOWED_HOSTS=$PUBLIC_IP,localhost,127.0.0.1|g" .env
    sed -i "s|CORS_ALLOWED_ORIGINS=.*|CORS_ALLOWED_ORIGINS=http://$PUBLIC_IP,http://$PUBLIC_IP:80|g" .env
    sed -i "s|VITE_API_URL=.*|VITE_API_URL=http://$PUBLIC_IP:8000/car-store/api/v1/|g" .env
    sed -i "s|DEBUG=.*|DEBUG=False|g" .env
    
    echo -e "${GREEN}✅ Archivo .env configurado${NC}"
else
    echo -e "${GREEN}✅ Archivo .env ya existe${NC}"
fi

# Construir imágenes
echo -e "${YELLOW}🔨 Construyendo imágenes Docker...${NC}"
docker-compose build

# Levantar contenedores
echo -e "${YELLOW}🚀 Iniciando contenedores...${NC}"
docker-compose up -d

# Esperar a que los servicios estén listos
echo -e "${YELLOW}⏳ Esperando a que los servicios estén listos...${NC}"
sleep 15

# Ejecutar migraciones
echo -e "${YELLOW}📦 Ejecutando migraciones...${NC}"
docker-compose exec -T backend python manage.py migrate --noinput

# Recopilar archivos estáticos
echo -e "${YELLOW}📁 Recopilando archivos estáticos...${NC}"
docker-compose exec -T backend python manage.py collectstatic --noinput

# Verificar estado
echo -e "${GREEN}📊 Estado de los contenedores:${NC}"
docker-compose ps

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ DESPLIEGUE COMPLETADO${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🌐 Frontend: http://$PUBLIC_IP${NC}"
echo -e "${GREEN}🔧 Backend: http://$PUBLIC_IP:8000/car-store/api/v1/${NC}"
echo -e "${GREEN}📚 API Docs: http://$PUBLIC_IP:8000/car-store/api/docs/${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"


