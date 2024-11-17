FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 4000

RUN npx prisma generate

# Запуск приложения
CMD ["npm", "run", "start:dev"]
