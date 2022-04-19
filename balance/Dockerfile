FROM node:alpine

WORKDIR /home/balance

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3333

CMD yarn dev