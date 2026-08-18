/** Страница документации API */

import { Typography } from "@mui/material";

import { Container } from "@/components/shared/container";

export default function ApiDocsPage() {
  return (
    <Container>
      <Typography style={{ marginBottom: "12px", fontWeight: 600 }}>
        Документация API
      </Typography>
      <Typography>Здесь будет документация API.</Typography>
    </Container>
  );
}