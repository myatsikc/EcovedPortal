/** Страница команды */

import { Typography } from "@mui/material";

import { Container } from "@/components/shared/container";

export default function TeamPage() {
  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Команда
      </Typography>
      <Typography>Информация о команде скоро появится.</Typography>
    </Container>
  );
}