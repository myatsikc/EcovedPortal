# Skill: Business Requirements Generation

## Context
Генерирует структурированные бизнес-требования для новых фич EcovedPortal.

## Rules
1. Анализируйте запрос пользователя на предмет новых функций, сущностей или изменений в поведении системы.
2. Формулируйте четкие функциональные и нефункциональные требования.
3. Описывайте пользовательские сценарии (User Stories), роли, данные и границы API.
4. **Именование:** Используйте единый префикс для раздела (например, `news-`, `volunteers-`, `auth-`).
5. **Локация:** Сохраняйте файл в `docs/business-requirements/{prefix}-requirements.md`.
6. Ожидайте явного утверждения пользователя перед переходом к технической спецификации.

## Output Format
- Заголовок: `## {Prefix} Business Requirements`
- Разделы: Overview, User Stories, Functional Requirements, Data Entities, Acceptance Criteria.
- Избегайте технических деталей реализации (фреймворки, таблицы БД, HTTP-методы).
- Держите документ лаконичным, actionable и ориентированным на ценность для волонтеров/аудитории.

## Workflow
1. Extract features -> 2. Draft spec -> 3. Save to docs -> 4. Wait for review -> 5. Prompt for next step.