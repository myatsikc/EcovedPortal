/** Полное отображение одной новости.

Включает изображение, дату публикации и текстовое содержание.
*/

import { Card, CardMedia, CardContent, Typography } from "@mui/material";

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
    <Card
      sx={{
        mb: 3,
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "var(--mui-shadows-4, 0 8px 25px rgba(0,0,0,0.1))",
        },
      }}
    >
      {news.image_url && (
        <CardMedia
          component="img"
          image={news.image_url}
          alt={`Новость от ${formattedDate}`}
          sx={{
            width: "100%",
            height: 240,
            objectFit: "cover",
          }}
        />
      )}
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: "block",
            mb: 1.5,
          }}
        >
          {formattedDate}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.7,
            color: "text.primary",
          }}
        >
          {news.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
