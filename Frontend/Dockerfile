# Step 1: Build the Angular App
FROM node:20.11.1 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all files and build the project
COPY . .
RUN npm run build --configuration=production

# Step 2: Use Nginx to Serve the Angular App
FROM nginx:latest

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built Angular app from the previous step
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html




# Expose port 80
EXPOSE 80
#docker-compose up --build -d
