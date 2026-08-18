/** Главная страница портала — лента новостей.

Отображает список новостей с бесконечной прокруткой.
Данные загружаются через TanStack Query из API бэкенда.
*/

import { Typography } from "@mui/material";

import { Container } from "@/components/shared/container";
import { NewsList } from "@/components/news/news-list";

export default function HomePage() {
  return (
    <Container>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
      >
        Новости
      </Typography>
      <NewsList />
    </Container>
  );
}
