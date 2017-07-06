FROM node:4.8.2

LABEL maintainer "docker@romuloscampini.com.br"

# Create app directory
RUN mkdir -p /opt/deploy/rs-documento-fiscal-api
WORKDIR /opt/deploy/rs-documento-fiscal-api

#Configure Port
ENV PORT 8080

#Setup Container
EXPOSE 8080

# Install app dependencies
COPY package.json /opt/deploy/rs-documento-fiscal-api
RUN npm install

# Bundle app source
COPY . /opt/deploy/rs-documento-fiscal-api

CMD [ "npm", "start" ]