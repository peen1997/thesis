FROM node:10-alpine

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install 

COPY . /usr/src/app/client

EXPOSE 3000

WORKDIR /usr/src/app

CMD ["npm","run","client"]
