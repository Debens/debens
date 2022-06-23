FROM node:lts as build-env

COPY . /src

WORKDIR src

RUN yarn

FROM node:lts-alpine as run-time

COPY --from=build-env src/ src/

WORKDIR src

CMD ["yarn", "start"]

EXPOSE 3000