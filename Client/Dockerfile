FROM node:14

WORKDIR /usr/src/client_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]