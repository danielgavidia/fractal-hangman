# Stage 1: Base stage using bun
FROM oven/bun:latest AS base

# Set the working directory inside the container
WORKDIR /app

# Copy the package and lock files to the working directory
COPY ./backend/package.json ./backend/bun.lockb ./

# Install the dependencies using bun
RUN bun install

# Copy the rest of the application code to the working directory
COPY ./backend .

# Expose the port that the Socket.IO server will run on
EXPOSE 3000

# Run the application
CMD ["bun", "run", "server.ts"]
