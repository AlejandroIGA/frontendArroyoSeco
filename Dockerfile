# --- Stage 1: Build the React application ---
# Use a Node.js image to compile the application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy dependency configuration files (package.json, package-lock.json)
# This allows Docker to cache this layer if dependencies not change
COPY package.json package-lock.json ./

# Install dependencies with npm
RUN npm install

# Copy the rest of the application files
# This will invalidate the cache for subsequent steps if any source files change
COPY . .

# Build the application for production with npm
# Vite by default outputs to a 'dist' directory
RUN npm run build

# --- Stage 2: Serve the application with Nginx ---
# Use a very light Nginx image to serve static files
FROM nginx:alpine

# Copy the custom Nginx configuration (crucial for React SPAs)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application files from the 'build' stage to Nginx's HTML directory
# IMPORTANT: Changed 'build' to 'dist' as Vite outputs to 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
