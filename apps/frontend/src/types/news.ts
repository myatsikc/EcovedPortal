/** TypeScript-типы для API новостей. */

/** Объект новости, возвращаемый API. */
export interface NewsItem {
  /** Уникальный идентификатор новости */
  id: number;
  /** Полное текстовое содержание */
  content: string;
  /** Дата и время публикации (ISO 8601) */
  date: string;
  /** URL изображения новости */
  image_url: string;
}

/** Ответ API на GET /api/news */
export interface NewsResponse {
  /** Массив новостей */
  news: NewsItem[];
  /** Общее количество новостей */
  total: number;
  /** Переданное значение limit */
  limit: number;
  /** Переданное значение offset */
  offset: number;
}