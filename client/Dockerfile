ARG NODE_VERSION=12

###

FROM node:$NODE_VERSION as builder

###

RUN npm install -g http-server

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN ["npm", "ci"]

COPY . .

RUN ["npm", "run", "build"]

CMD [ "http-server", "build" ]

EXPOSE 8080