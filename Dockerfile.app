FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 4000

# Запуск приложения
CMD ["sh", "-c", "npm run migrate:prod && npm run migrate:add-favorites && npm run start:dev"]
