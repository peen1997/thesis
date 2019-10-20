FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

CMD ['cd','client']

RUN npm install

CMD ['cd','..']

EXPOSE 5000

CMD ['npm','run','dev']
