/** Полное отображение одной новости.

Включает изображение, дату публикации и текстовое содержание.
Используем HTML div вместо MUI Card для совместимости с SSR.
*/

import type { NewsItem } from "@/types/news";

interface NewsItemProps {
  news: NewsItem;
}

export function NewsItem({ news }: NewsItemProps) {
  // Форматируем дату в локальном формате (день.месяц.год)
  const formattedDate = new Date(news.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        marginBottom: 12,
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        borderRadius: 2,
        boxShadow: "0 2px 4px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12)",
      }}
    >
      {news.image_url && (
        <img
          src={news.image_url}
          alt={`Новость от ${formattedDate}`}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: 400,
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
            display: "block",
          }}
        />
      )}
      <div style={{ padding: 12 }}>
        <span
          style={{
            color: "var(--mui-palette-text-secondary, rgba(0, 0, 0, 0.6))",
            display: "block",
            marginBottom: 6,
          }}
        >
          {formattedDate}
        </span>
        <p
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.7,
            color: "var(--mui-palette-text-primary)",
            margin: 0,
          }}
        >
          {news.content}
        </p>
      </div>
    </div>
  );
}
