FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 4000

RUN npx prisma generate

# Запуск приложения
CMD ["npm", "run", "start:dev"]
