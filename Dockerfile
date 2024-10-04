# Step 1: Build
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache the npm install step
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Step 2: Run
FROM nginx:1.25.4-alpine-slim

# Copy the build output to the NGINX html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
