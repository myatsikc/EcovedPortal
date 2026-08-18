/** Страница документации API — заглушка. */

export default function ApiDocsPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Документация API</h1>
      <p>
        <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
          Открыть Swagger UI
        </a>
      </p>
      <h2>GET /api/news</h2>
      <p>Возвращает список последних новостей с пагинацией.</p>
      <h3>Параметры</h3>
      <ul>
        <li><code>limit</code> — количество новостей (по умолч. 10)</li>
        <li><code>offset</code> — смещение (по умолч. 0)</li>
      </ul>
      <h3>Ответ</h3>
      <pre>{`{
  "news": [{ "id": 1, "content": "...", "date": "...", "image_url": "..." }],
  "total": 3,
  "limit": 10,
  "offset": 0
}`}</pre>
    </div>
  );
}