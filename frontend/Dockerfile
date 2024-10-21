# Stage 1: Build the React app using bun
FROM oven/bun:latest AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb for bun dependencies, and also types for type references
COPY ./frontend/package.json ./frontend/bun.lockb ./

# Install dependencies using bun
RUN bun install

# Copy the rest of the application code
COPY ./frontend .

# Build the Vite app
RUN bun run build

# Stage 2: Serve the built files with a simple server
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
