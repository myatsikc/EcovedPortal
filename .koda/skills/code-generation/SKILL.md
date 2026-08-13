# Skill: Code Generation

## Context
Генерирует бэкенд (FastAPI) и фронтенд (Next.js) код на основе утвержденных технических спецификаций.

## Rules
1. Обязательно читайте соответствующую техспеку из `docs/technical-specs/{prefix}-spec.md` перед генерацией кода.
2. Бэкенд: создавайте маршруты (routes), модели (SQLModel), сервисы и валидацию DTO.
3. Фронтенд: создавайте компоненты, хуки (TanStack Query), страницы и API-клиент вызовы.
4. **Структура:** Размещайте файлы в `apps/backend/src/{prefix}/` и `apps/frontend/src/{prefix}/`.
5. **Именование:** Все файлы раздела должны иметь одинаковый префикс (например, `news-list.tsx`, `news-api.py`).
6. Строго соблюдайте правила комментирования из `AGENTS.md` (docstrings, JSDoc, акцент на ЗАЧЕМ/КАК).
7. Убедитесь, что REST-контракт точно соответствует технической спецификации.
8. Не инициируйте `git commit` или `git push` без явной команды пользователя.

## Workflow
1. Read tech spec -> 2. Generate Backend -> 3. Generate Frontend -> 4. Apply comments & structure -> 5. Provide testing/deployment checklist -> 6. Wait for user feedback.

## Best Practices
- Используйте типизацию (TypeScript для фронта, Pydantic для бэка).
- Делайте код модульным и переиспользуемым.
- При изменении логики обновляйте соответствующие файлы в `docs/technical-specs/`.
- Если задача выходит за рамки текущей фичи, уточните у пользователя перед расширением области.