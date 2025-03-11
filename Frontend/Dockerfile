# Use Node.js v20.11.1 for building Angular app
FROM node:20.11.1 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including Angular CLI v19.0.1
RUN npm install -g @angular/cli@19.0.1
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build the Angular app
RUN npm run build --prod 

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy built files to Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
