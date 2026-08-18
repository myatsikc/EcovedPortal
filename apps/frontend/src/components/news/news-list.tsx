/** Список новостей с бесконечной прокруткой.

Использует TanStack Query (useNews) для загрузки данных.
При достижении конца страницы автоматически подгружает следующую порцию.
*/

"use client";

import { useEffect, useRef } from "react";

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
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" opacity="0.75"/>
        </svg>
      </div>
    );
  }

  // Обработка ошибки
  if (error) {
    return (
      <p style={{ textAlign: "center", padding: "16px 0", color: "var(--mui-palette-error-main, #d32f2f)" }}>
        Ошибка загрузки новостей. Попробуйте обновить страницу.
      </p>
    );
  }

  // Извлекаем все новости из страниц
  const allNews = data?.pages.flatMap((page) => page.news) ?? [];

  // Если новостей нет
  if (allNews.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "16px 0" }}>
        Новостей пока нет.
      </p>
    );
  }

  return (
    <>
      {allNews.map((news, index) => (
        <NewsItem key={index} news={news} />
      ))}

      {/* Наблюдатель для триггера бесконечной прокрутки */}
      <div ref={observerTarget} style={{ height: 1, padding: "8px 0" }} />

      {/* Индикатор загрузки следующей страницы */}
      {isFetchingNextPage && (
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" opacity="0.75"/>
          </svg>
        </div>
      )}
    </>
  );
}
