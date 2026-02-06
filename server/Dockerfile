FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts=false

COPY . .

RUN pnpm prisma generate --schema=./prisma/schema.prisma
RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
