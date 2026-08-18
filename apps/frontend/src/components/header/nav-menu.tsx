/** Навигационное меню портала.

Два пункта: «Новости» (активный по умолчанию) и «О команде».
Активный пункт выделяется зелёным цветом и жирностью.
*/

"use client";

import { Link as MuiLink, Stack } from "@mui/material";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { label: "Новости", href: "/" },
  { label: "О команде", href: "/team" },
];

export function NavMenu() {
  const pathname = usePathname();

  return (
    <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
      {MENU_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <MuiLink
            key={item.href}
            href={item.href}
            underline="none"
            sx={{
              color: isActive
                ? "var(--mui-palette-success-main, #4CAF50)"
                : "text.primary",
              fontWeight: isActive ? 700 : 400,
              fontSize: "1rem",
              borderBottom: isActive ? "2px solid" : "2px solid transparent",
              borderBottomColor: "var(--mui-palette-success-main, #4CAF50)",
              transition: "all 0.2s ease",
            }}
          >
            {item.label}
          </MuiLink>
        );
      })}
    </Stack>
  );
}
