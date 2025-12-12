# --- Stage 1: Build the React application ---
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# --- Stage 2: Serve the application using Nginx ---
FROM nginx:stable-alpine

# Copy the build output from the build stage to Nginx's web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default) or use environment variable for dynamic port
ARG PORT=80
EXPOSE ${PORT}

# Allow Nginx to listen on a custom port if needed
ENV PORT=${PORT}
RUN sed -i "s/listen 80;/listen ${PORT};/g" /etc/nginx/conf.d/default.conf

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]