# --- Stage 1: Build the React application ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Declare build arguments (estas se pasan desde docker-compose o GitHub Actions)
ARG VITE_API_URL
# Establece las variables de entorno para el build
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]