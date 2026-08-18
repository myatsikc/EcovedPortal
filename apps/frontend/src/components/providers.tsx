/** Клиентские провайдеры (QueryClientProvider).

ThemeProvider вынесен в root.css — используем CSS variables,
так как MUI theme содержит функции, которые не могут
сериализоваться при SSR в Next.js.
*/

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Создаём QueryClient на уровне модуля
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
