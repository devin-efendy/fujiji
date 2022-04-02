# Dockerfile adapted from https://medium.com/swlh/dockerize-your-next-js-application-91ade32baa6

# base image
FROM node:16.0.0-alpine

# create & set working directory
RUN mkdir -p /app
WORKDIR /app

# copy source files
COPY . /app

RUN apk update && apk add bash 

# install dependencies
RUN npm ci

# start app
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]