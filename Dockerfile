FROM node:14-alpine

WORKDIR /src
COPY package*.json /
EXPOSE 3000

RUN npm install
COPY . /
CMD ["npm", "start:prod"]