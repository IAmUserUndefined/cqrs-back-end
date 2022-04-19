FROM node:alpine

WORKDIR /home/transaction

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3334

CMD yarn dev