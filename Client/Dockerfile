FROM node:14

WORKDIR /usr/src/client_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]