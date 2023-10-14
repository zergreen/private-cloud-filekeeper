FROM node:18

RUN npm install -g nodemon

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . /app

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm","run","dev"]