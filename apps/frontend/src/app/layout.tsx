/** Корневой layout приложения.

Обёртывает все страницы портала. Содержит:
- Материал-UI тему с кастомными цветами
- Header (шапка «Эковеды») с sticky-позиционированием
- NavMenu (навигационное меню)
- Container для контента каждой страницы
- QueryClientProvider для TanStack Query
*/

import type { Metadata } from "next";

import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "@/components/header/header";
import { NavMenu } from "@/components/header/nav-menu";

export const metadata: Metadata = {
  title: "Эковеды — портал экологического движения",
  description: "Портал экологического движения Эковеды",
};

// Отключаем статическую генерацию — MUI theme содержит функции
export const dynamic = 'force-dynamic';

// Создаём QueryClient на уровне модуля, чтобы переиспользовать его
const queryClient = new QueryClient();

// Тема MUI с кастомным зелёным цветом
const theme = createTheme({
  palette: {
    success: {
      main: "#4CAF50",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 2,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {/* Sticky-шапка с навигацией */}
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
              <div
                style={{
                  maxWidth: 900,
                  margin: "0 auto",
                  padding: "0 16px",
                }}
              >
                <Header />
                <NavMenu />
              </div>
            </header>

            {/* Основной контент */}
            <main>{children}</main>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
