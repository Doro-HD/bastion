FROM node:22-alpine3.21 AS builder

RUN apk add --no-cache gcompat
RUN apk add pnpm

WORKDIR /app

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter server install --prod --frozen-lockfile
RUN pnpm --filter server build
RUN pnpm --filter server deploy --prod /prod/server

FROM builder AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /prod/server/node_modules ./node_modules
COPY --from=builder --chown=hono:nodejs /prod/server/dist ./dist
COPY --from=builder --chown=hono:nodejs /prod/server/package.json ./package.json

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]