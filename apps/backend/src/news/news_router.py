"""Роутер для эндпоинтов новостей.

Предоставляет GET /api/news/ с пагинацией (limit/offset).
Данные берутся из заглушки (news_stub.py) — хардкод 3 тестовые новости.
"""

from fastapi import APIRouter, Query

from .news_stub import NEWS_STUB

router = APIRouter(prefix="/api/news", tags=["news"])


@router.get("")
def get_news(
    limit: int = Query(default=10, ge=1, description="Количество новостей для возврата"),
    offset: int = Query(default=0, ge=0, description="Смещение (начиная с какой новости отдавать"),
):
    """Возвращает список последних новостей с пагинацией.

    Данные пока берутся из заглушки (хардкод).
    В будущем будет подключена база данных.
    """
    # Срез списка новостей согласно параметрам пагинации
    paginated = NEWS_STUB[offset : offset + limit]

    return {
        "news": [
            {
                "id": news.id,
                "content": news.content,
                "date": news.date.isoformat(),
                "image_url": news.image_url,
            }
            for news in paginated
        ],
        "total": len(NEWS_STUB),
        "limit": limit,
        "offset": offset,
    }
