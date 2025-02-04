# Base image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json to workdir
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code to the workdir
COPY . .

# Build the project
RUN npm run build

# Nginx for the web server
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Expose default port
EXPOSE 80

# Start Nginx
CMD [ "nginx", "-g", "daemon off;" ]