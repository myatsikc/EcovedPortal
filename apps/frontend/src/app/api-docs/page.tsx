/** Страница документации API */

import { Container } from "@/components/shared/container";

export default function ApiDocsPage() {
  return (
    <Container>
      <h2
        style={{ marginBottom: "12px", fontWeight: 600, color: "var(--mui-palette-text-primary)" }}
      >
        Документация API
      </h2>
      <p>Здесь будет документация API.</p>
    </Container>
  );
}