# Use  official Node.js image from Docker Hub
FROM node:16

# Set working directory inside container
WORKDIR /app

# Copy package.json & package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining application files
COPY . .

# Expose port on which app will run 
EXPOSE 3000

# Define command to run app
CMD ["node", "index.js"]
