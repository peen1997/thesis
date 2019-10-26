FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . /usr/src/app

WORKDIR /usr/src/app/client

RUN npm install

WORKDIR /usr/src/app

EXPOSE 3000

CMD [ "npm", "run","dev"]
