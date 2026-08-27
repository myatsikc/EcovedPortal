FROM node:22-alpine AS builder

# URL бэкенда для проксирования /api/*. Подставляется при сборке
# (build-arg), т.к. Next.js запекает rewrites в routes-manifest.json.
ARG API_PROXY_URL=http://localhost:8000
ENV API_PROXY_URL=$API_PROXY_URL

WORKDIR /app

# Устанавливаем зависимости
COPY package.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

FROM node:22-alpine

WORKDIR /app

# Копируем зависимости и собранное приложение из builder
COPY package.json ./
RUN npm install --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
