ARG NODE_VERSION=12

###

FROM node:$NODE_VERSION as builder

###

FROM builder as server-builder

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN ["npm", "ci"]

COPY . .

RUN ["npm", "run", "build"]

COPY ./appconfig.json .

CMD ["node", "dist/main.js"]

EXPOSE 4000
