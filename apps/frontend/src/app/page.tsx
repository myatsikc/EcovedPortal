/** Главная страница портала — лента новостей.

Отображает список новостей с бесконечной прокруткой.
Данные загружаются через TanStack Query из API бэкенда.
*/

import { Container } from "@/components/shared/container";
import { NewsList } from "@/components/news/news-list";

export default function HomePage() {
  return (
    <Container>
      <h5
        style={{ marginBottom: "12px", fontWeight: 600, color: "var(--mui-palette-text-primary)" }}
      >
        Новости
      </h5>
      <NewsList />
    </Container>
  );
}
