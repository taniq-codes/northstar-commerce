FROM node:24.22.1-alpine AS base
RUN corepack enable
WORKDIR /app
COPY package.json ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm db:generate
EXPOSE 3000
CMD ["pnpm", "dev"]
