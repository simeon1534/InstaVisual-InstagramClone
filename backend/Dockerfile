# Use Node.js 18 base image
# FROM node:18(old version and more vulnerability)
FROM node:21-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if using npm
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 500

# Check if the app is within a container
ENV AM_I_IN_A_DOCKER_CONTAINER Yes

# Command to run your app using the "server" script
CMD [ "npm", "run", "server" ]
