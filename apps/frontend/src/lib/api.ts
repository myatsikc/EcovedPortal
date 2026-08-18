/** API-клиент для работы с новостями через TanStack Query.

Использует useInfiniteQuery для поддержки бесконечной прокрутки.
Базовый URL берётся из переменной окружения NEXT_PUBLIC_API_URL.
*/

import { useInfiniteQuery } from "@tanstack/react-query";

import type { NewsResponse } from "@/types/news";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Параметры страницы для бесконечной прокрутки. */
interface NewsQueryParams {
  pageParam: number;
  limit?: number;
}

/** Загружает одну страницу новостей с указанным offset. */
async function fetchNewsPage({
  pageParam,
  limit = 10,
}: NewsQueryParams): Promise<NewsResponse> {
  const response = await fetch(
    `${API_BASE}/api/news/?limit=${limit}&offset=${pageParam}`
  );
  if (!response.ok) {
    throw new Error(`Ошибка загрузки новостей: ${response.status}`);
  }
  return response.json();
}

/**
 * TanStack Query хук для загрузки новостей с бесконечной прокруткой.
 *
 * @param limit — количество новостей на странице (по умолчанию 10)
 * @returns объект хука useInfiniteQuery
 */
export function useNews(limit: number = 10) {
  return useInfiniteQuery({
    queryKey: ["news", limit],
    queryFn: ({ pageParam }) => fetchNewsPage({ pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit: pageLimit, total } = lastPage;
      if (offset + pageLimit < total) {
        return offset + pageLimit;
      }
      return undefined;
    },
  });
}