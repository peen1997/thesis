FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

CMD ['cd','client']

RUN npm install

RUN npm audit fix

CMD ['cd','..']

EXPOSE 3000

CMD ['npm','run','dev']
