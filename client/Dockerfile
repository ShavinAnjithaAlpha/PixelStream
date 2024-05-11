# Use the official NGINX image as the base image
FROM nginx

# Remove the default NGINX configuration file
# RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom NGINX configuration file from the project
# COPY nginx/nginx.conf /etc/nginx/conf.d/

# Copy the build dist folder to the NGINX web root directory
COPY dist /usr/share/nginx/html

# Expose port 80 to allow incoming traffic
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]