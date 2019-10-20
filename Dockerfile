FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . /usr/src/app

EXPOSE 5000

CMD [ "npm", "run","server"]

