FROM node:21-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# RUN npm run build

# ENV PORT 5000 
ENV VITE_REACT_APP_API_URL http://localhost:1337

EXPOSE 5000
EXPOSE 1337
# VOLUME [ "/app/data" ]

CMD [ "npm", "run", "dev"]