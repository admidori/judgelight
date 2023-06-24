FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./

RUN yarn install

CMD ["yarn", "start"]