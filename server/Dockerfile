FROM node:20-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 1337
EXPOSE $PORT
EXPOSE 21481
EXPOSE 6000

# VOLUME [ "/app/data" ]

CMD [ "npm", "run", "dev"]