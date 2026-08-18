/** Общий контейнер для контента страниц.

Ограничивает максимальную ширину, центрирует контент
и добавляет отступы сверху.
*/

import { Box, type BoxProps } from "@mui/material";

export function Container(props: BoxProps) {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: 2,
        pt: 3,
        pb: 6,
        width: "100%",
        boxSizing: "border-box",
        ...props.sx,
      }}
      {...props}
    >
      {props.children}
    </Box>
  );
}
