/** Шапка портала "Эковеды".

Отображает название с акцентом на слове "Эко" (зелёный цвет).
Фиксируется в верхней части экрана при скролле.
*/

import { Typography } from "@mui/material";

export function Header() {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        fontSize: { xs: "1.5rem", sm: "2rem" },
        userSelect: "none",
      }}
    >
      <span style={{ color: "var(--mui-palette-success-main, #4CAF50)" }}>
        Эко
      </span>
      <span>веды</span>
    </Typography>
  );
}
