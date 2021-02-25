# Use Node V12 as the base image.
FROM node:12

# create and set app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy package json and install dependencies
COPY package*.json ./
RUN npm install

# copy application
COPY . .

# Start the application 
CMD ["node", "app.js"]