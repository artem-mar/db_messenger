FROM node:latest

ARG MODE

ENV MODE=$MODE

WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .

CMD npm run $MODE