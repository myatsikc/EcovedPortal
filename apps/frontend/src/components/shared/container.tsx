/** Общий контейнер для контента страниц.

Ограничивает максимальную ширину, центрирует контент
и добавляет отступы сверху.
Используем div вместо MUI Box, чтобы избежать проблем
с SSR (sx prop содержит функции).
*/

export function Container(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, style, ...rest } = props;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 24,
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
