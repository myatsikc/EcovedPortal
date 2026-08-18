/** Корневой layout приложения.

Обёртывает все страницы портала. Содержит:
- Header (шапка «Эковеды») с sticky-позиционированием
- NavMenu (навигационное меню)
- Providers (QueryClientProvider)

ThemeProvider вынесен в CSS variables (globals.css),
так как MUI theme содержит функции, несовместимые с SSR.
*/

import type { Metadata } from "next";

import "./globals.css";

import { Providers } from "@/components/providers";
import { Header } from "@/components/header/header";
import { NavMenu } from "@/components/header/nav-menu";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Эковеды — портал экологического движения",
  description: "Портал экологического движения Эковеды",
};

// Отключаем SSR — компоненты используют CSS variables вместо MUI theme
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
            <header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                backgroundColor: "var(--mui-palette-background-paper)",
                paddingTop: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid var(--mui-palette-divider)",
              }}
            >
              <Header />
              <NavMenu />
            </header>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
