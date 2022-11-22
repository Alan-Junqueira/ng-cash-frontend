FROM node:18.12

WORKDIR /home/alan/development/ng-cash/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]