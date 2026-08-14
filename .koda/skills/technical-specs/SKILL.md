# Skill: Technical Specifications Generation

## Context
Генерирует детальные технические спецификации на основе утвержденных бизнес-требований. Файл служит связующим звеном между бизнес-логикой и кодом. Не содержит код, кроме примеров и пояснений.

## Rules
1. **Анализ:** Изучите файл бизнес-требований из `docs/business-requirements/{prefix}-requirements.md`.
2. **Бэкенд (API & DB):**
   - Определите REST эндпоинты (HTTP методы, URL, параметры запроса/ответа).
   - Опишите модели SQLModel (таблицы БД, связи, поля).
   - Укажите бизнес-логику валидации и обработки данных.
3. **Фронтенд (UI & State):**
   - Опишите структуру React-компонентов (MUI).
   - Определите интеграцию с TanStack Query для работы с API.
   - Опишите пользовательские сценарии взаимодействия.
4. **Именование:** Используйте единый префикс для раздела (например, `news-`, `volunteers-`).
5. **Локация:** Сохраняйте файл в `docs/technical-specs/{prefix}-spec.md`.
6. **Не планируйте:** Не добавляйте разделы "Future Steps", "Next Steps" и аналогичные без прямой команды пользователя. Спецификация описывает только текущую задачу.

## Output Format
- Заголовок: `## {Prefix} Technical Specification`
- Разделы: API Contract, Database Schema, Component Architecture, Data Flow.
- Технические детали должны быть конкретными (типы данных, HTTP коды, названия таблиц).
- Избегайте дублирования бизнес-логики, фокусируйтесь на реализации.

## Workflow
1. Read Business Requirements -> 2. Design Architecture (API/DB/UI) -> 3. Draft Tech Spec -> 4. Save to docs -> 5. Wait for approval -> 6. Trigger Code Generation skill.