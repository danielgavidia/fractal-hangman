# Stage 1: Build the React app using Node
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm dependencies, and also types for type references
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Remove node_modules and package-lock.json to avoid cache issues
RUN rm -rf node_modules package-lock.json

# Install dependencies using npm
RUN npm install

# Copy the rest of the application code
COPY ./frontend .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the built files with a simple server
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx config file
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (changes)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
