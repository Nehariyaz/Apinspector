# Use Node.js as base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the rest of the backend code
COPY . .

# Expose the backend port (change this if needed)
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
