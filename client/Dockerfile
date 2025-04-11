FROM node:22-alpine3.21 AS builder

RUN apk add --no-cache gcompat
RUN apk add pnpm

WORKDIR /app

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter client install --prod --frozen-lockfile
RUN pnpm --filter client build
RUN pnpm --filter client deploy --prod /prod/client


FROM nginx:alpine3.21

COPY --from=builder /prod/client/build/. /usr/share/nginx/html

EXPOSE 80