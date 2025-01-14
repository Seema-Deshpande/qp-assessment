FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

RUN tsc

FROM node:18-slim

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/app.js"]
