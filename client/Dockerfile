FROM node:10-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

RUN npm audit fix

COPY . ./

EXPOSE 3000

CMD ["npm","start"]
