/**
 * Конфигурация Next.js.
 *
 * Проксирует все запросы /api/* на бэкенд, чтобы фронтенд и браузер
 * работали с API как с same-origin (не возникает проблем с CORS,
 * а внутри Docker-сети SSR корректно ходит на имя сервиса `backend`).
 */
/** @type {import('next').NextConfig} */

// Базовый URL бэкенда для проксирования.
// В Docker-сети задаётся через API_PROXY_URL=http://backend:8000,
// локально (npm run dev) используется fallback http://localhost:8000.
const API_PROXY_URL = process.env.API_PROXY_URL ?? "http://localhost:8000";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_PROXY_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
