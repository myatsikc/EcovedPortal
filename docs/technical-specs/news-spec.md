# News Technical Specification

## Overview
Техническая спецификация для реализации страницы "Новости" портала EcovedPortal. На данном этапе бэкенд использует заглушку (хардкод 3 тестовые новости) без подключения базы данных.

---

## API Contract

### Бэкенд: FastAPI

**Базовый URL:** `http://localhost:8000` (локальная разработка)

#### Эндпоинт: GET `/api/news`

Возвращает список последних новостей с пагинацией. Данные хардкодятся в коде (3 тестовые новости).

**Query Parameters:**

| Параметр | Тип | Обязательный | По умолчанию | Описание |
|----------|-----|--------------|--------------|----------|
| `limit` | int | Нет | 10 | Количество новостей для возврата |
| `offset` | int | Нет | 0 | Смещение (начиная с какой новости отдавать) |

**Ответ (200 OK):**

Объект JSON с полями:
- `news` — массив объектов новостей
- `total` — общее количество новостей (3)
- `limit` — переданное значение limit
- `offset` — переданное значение offset

**Структура объекта новости:**

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | Уникальный идентификатор |
| `content` | string | Полное текстовое содержание |
| `date` | string (ISO 8601) | Дата и время публикации |
| `image_url` | string | URL изображения новости |

**HTTP-коды ответа:**
- `200 OK` — успешный запрос
- `422 Unprocessable Entity` — некорректные параметры запроса

#### Swagger UI (документация API)

FastAPI автоматически генерирует Swagger UI. Доступен по:
- `http://localhost:8000/docs` — интерактивная документация (Swagger)
- `http://localhost:8000/redoc` — альтернативная документация (ReDoc)

На продакшене URL будет: `https://api.ecoved.ru/docs`

**Решение:** Используем стандартный Swagger UI FastAPI "из коробки". Ссылка на `/docs` будет размещена в навигации фронтенда на странице `/api-docs`.

---

## Backend Implementation Details

### Структура проекта бэкенда

```
apps/backend/src/news/
├── news_model.py          # SQLModel-модель News (заготовка под будущую БД)
├── news_router.py         # Роутер с эндпоинтом GET /api/news
└── news_stub.py           # Хардкод-данные (3 тестовые новости)
```

### Модель данных (`news_model.py`)

- Класс `News` наследуется от `SQLModel` с параметром `table=True`
- Поля:
  - `id` — int, первичный ключ
  - `content` — str, текстовое содержание
  - `date` — datetime, значение по умолчанию — текущее время
  - `image_url` — str, URL изображения

> **Примечание:** Модель создана для будущего подключения PostgreSQL. Пока данные не читаются из БД, а отдаются из заглушки.

### Заглушка данных (`news_stub.py`)

Три тестовые новости, отсортированные по дате (от новой к старой):

| ID | Дата | Картинка |
|----|------|----------|
| 3 | 2025-07-28 | `/static/news/1.jpg` |
| 2 | 2025-07-15 | `/static/news/2.jpg` |
| 1 | 2025-07-01 | `/static/news/3.jpg` |

### Роутер (`news_router.py`)

- Создаётся экземпляр `APIRouter` с префиксом `/api/news` и тегом `news`
- Определяется один эндпоинт `GET /` (полный URL: `/api/news/`)
- Параметры запроса:
  - `limit` — int, по умолчанию 10, минимум 1
  - `offset` — int, по умолчанию 0, минимум 0
- Логика:
  1. Срезает список новостей из заглушки: `NEWS_STUB[offset:offset + limit]`
  2. Возвращает объект с полями `news`, `total`, `limit`, `offset`

### Точка входа (`main.py`)

- Создаётся экземпляр `FastAPI` с названием `EcovedPortal API` и версией `0.1.0`
- Регистрируется роутер новостей из `src/news/news_router.py`

---

## Database Schema (Заготовка на будущее)

Пока база данных не подключается. Схема подготовлена для будущего миграрования:

- Таблица `news`
- Поля: `id` (SERIAL PRIMARY KEY), `content` (TEXT NOT NULL), `date` (TIMESTAMP NOT NULL DEFAULT NOW()), `image_url` (VARCHAR(1000) NOT NULL)

---

## Component Architecture (Фронтенд)

**Стек:** Next.js (App Router) + TypeScript + Material UI (MUI) + TanStack Query

### Структура компонентов

```
apps/frontend/src/
├── app/
│   └── page.tsx                # Главная страница (Лента новостей)
├── components/
│   └── news/
│       ├── news-list.tsx       # Компонент списка новостей
│       └── news-item.tsx       # Полное отображение новости
├── lib/
│   └── api.ts                  # API-клиент (TanStack Query hooks)
└── types/
    └── news.ts                 # TypeScript-типы для новостей
```

### Компоненты

#### 1. NewsList (`components/news/news-list.tsx`)

- Отображает массив новостей
- Использует TanStack Query для загрузки данных
- Поддерживает **бесконечную прокрутку** (infinite scroll):
  - При достижении конца страницы автоматически подгружает следующую порцию
  - Параметр `offset` увеличивается на `limit`

#### 2. NewsItem (`components/news/news-item.tsx`)

- Полное отображение одной новости:
  - Картинка — вверху, на всю ширину карточки
  - Дата публикации — мелким серым шрифтом над текстом
  - Полное содержание — обычным текстом

---

## Data Flow

### Загрузка новостей

```
1. User открывает страницу / (Новости)
        │
        ▼
2. NewsList компонент монтируется
        │
        ▼
3. TanStack Query hook (useNews) делает GET /api/news?limit=10&offset=0
        │
        ▼
4. Бэкенд (FastAPI) возвращает JSON с новостями
        │
        ▼
5. NewsList получает данные и рендерит NewsItem для каждой новости
        │
        ▼
6. При скролле до конца → автоматический запрос с увеличенным offset
        │
        ▼
7. Новые новости добавляются в конец списка
```

### TanStack Query hook (`lib/api.ts`)

**Типы (`types/news.ts`):**
- `NewsItem` — объект новости: `id`, `content`, `date`, `image_url`
- `NewsResponse` — ответ API: `news` (массив), `total`, `limit`, `offset`

**Хук (`lib/api.ts`):**
- Используется `useInfiniteQuery` из TanStack Query
- Базовый URL берётся из переменной окружения `NEXT_PUBLIC_API_URL`, по умолчанию `http://localhost:8000`
- Запрос: `GET /api/news?limit=10&offset={pageParam}`
- `getNextPageParam`: если `offset + limit < total`, следующая страница с `offset + limit`, иначе `undefined` (конец загрузки)
- `initialPageParam`: 0

---

## Pages Map

| Страница | Путь | Описание |
|----------|------|----------|
| Главная / Новости | `/` | Лента новостей, бесконечная прокрутка |

---

## Environment Variables

**Фронтенд (`.env.local`):**

Переменная `NEXT_PUBLIC_API_URL` = `http://localhost:8000`

На продакшене: `https://api.ecoved.ru`
