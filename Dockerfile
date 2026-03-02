FROM node:22-alpine
LABEL version="1.0"
LABEL description="This is the docker image for the slider backend project"
LABEL maintainer = ["skydev55@outlook.com"]
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/backend
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .