# Use the official Node.js 20.x image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Update the package lists for upgrades and new package installations
RUN apt-get update

# Install ExifTool
RUN apt-get install -y exiftool

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install a global package (replace "package-name" with the name of the package)
RUN npm install -g pm2

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the server will run
EXPOSE 5000

# Start the server
CMD ["npm", "start"]