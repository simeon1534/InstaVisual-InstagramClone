# Use the official MySQL image as the base image
FROM mysql:latest

# Set environment variables
ENV MYSQL_DATABASE=instagram_test
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes

# Copy the SQL script to the Docker image
COPY ./instagram_test.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306