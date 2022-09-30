FROM node:lts-alpine AS base

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

ARG SCOPE
ENV SCOPE=${SCOPE}
ENV YARN_CACHE_FOLDER=.yarn-cache

FROM base as pruner

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=${SCOPE} --docker

FROM base as development

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

FROM base as production

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=development /app/${YARN_CACHE_FOLDER} /${YARN_CACHE_FOLDER} 

RUN yarn install --frozen-lockfile --production --prefer-offline --ignore-scripts

RUN rm -rf /app/${YARN_CACHE_FOLDER}

FROM base AS builder

COPY --from=development /app/ .
COPY --from=pruner /app/out/full/ .

RUN yarn turbo run build --scope=${SCOPE} --include-dependencies --no-deps
RUN find . -name node_modules | xargs rm -rf

FROM base AS runner

COPY --from=production /app/ .
COPY --from=builder /app/ .

CMD yarn workspace ${SCOPE} launch

EXPOSE 3000