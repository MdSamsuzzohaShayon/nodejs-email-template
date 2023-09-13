FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Migration
RUN npx sequelize-cli db:migrate

EXPOSE 8000

# CMD ["node", "app.js"]
