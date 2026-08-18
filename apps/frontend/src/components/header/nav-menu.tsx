/** Навигационное меню портала.

Два пункта: «Новости» (активный по умолчанию) и «О команде».
Активный пункт выделяется зелёным цветом и жирностью.
Используем HTML nav вместо MUI Stack для совместимости с SSR.
*/

"use client";

import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { label: "Новости", href: "/" },
  { label: "О команде", href: "/team" },
];

export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        gap: "12px",
        marginTop: 4,
      }}
    >
      {MENU_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            style={{
              color: isActive
                ? "var(--mui-palette-success-main, #4CAF50)"
                : "var(--mui-palette-text-primary)",
              fontWeight: isActive ? 700 : 400,
              fontSize: "1rem",
              borderBottom: isActive ? "2px solid var(--mui-palette-success-main, #4CAF50)" : "2px solid transparent",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
