# Use  official Node.js image from Docker Hub
FROM node:24

# Set working directory inside container
WORKDIR /app

# Copy package.json & package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining application files
COPY . .

# Configure Health check, moving it from docker-compose file
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD [ "CMD", "curl", "-f", "http://localhost:3000/health" ]

# Expose port on which app will run 
EXPOSE 3000

# Define command to run app
CMD ["node", "index.js"]
