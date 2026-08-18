/** Список новостей с бесконечной прокруткой.

Использует TanStack Query (useNews) для загрузки данных.
При достижении конца страницы автоматически подгружает следующую порцию.
*/

"use client";

import { useEffect, useRef } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

import { useNews } from "@/lib/api";
import { NewsItem } from "@/components/news/news-item";

export function NewsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useNews(10);

  // Реф для отслеживания момента, когда пользователь доскроллил до конца
  const observerTarget = useRef<HTMLDivElement>(null);

  // IntersectionObserver для автоматической подгрузки при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const current = observerTarget.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  // Обработка загрузки
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Обработка ошибки
  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
        Ошибка загрузки новостей. Попробуйте обновить страницу.
      </Typography>
    );
  }

  // Извлекаем все новости из страниц
  const allNews = data?.pages.flatMap((page) => page.news) ?? [];

  // Если новостей нет
  if (allNews.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", py: 4 }}>
        Новостей пока нет.
      </Typography>
    );
  }

  return (
    <>
      {allNews.map((news) => (
        <NewsItem key={news.id} news={news} />
      ))}

      {/* Наблюдатель для триггера бесконечной прокрутки */}
      <Box ref={observerTarget} sx={{ height: 1, py: 2 }} />

      {/* Индикатор загрузки следующей страницы */}
      {isFetchingNextPage && (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </>
  );
}
