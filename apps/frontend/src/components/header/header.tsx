/** Шапка портала "Эковеды".

Отображает название с акцентом на слове "Эко" (зелёный цвет).
Фиксируется в верхней части экрана при скролле.
Используем h1 вместо MUI Typography, чтобы избежать проблем с SSR.
*/

export function Header() {
  return (
    <h1
      style={{
        fontWeight: "bold",
        fontSize: "1.5rem",
        userSelect: "none",
        margin: 0,
      }}
    >
      <span style={{ color: "var(--mui-palette-success-main, #4CAF50)" }}>
        Эко
      </span>
      <span>веды</span>
    </h1>
  );
}
