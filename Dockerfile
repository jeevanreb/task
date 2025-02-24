# Use Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
