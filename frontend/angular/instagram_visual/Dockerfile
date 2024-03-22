





# Use Node.js 18 base image
# FROM node:18(old version and more vulnerabilities)
FROM node:21-slim

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

# creates and runs the Angular application for external access.
CMD ["ng", "serve", "--host", "0.0.0.0"]
