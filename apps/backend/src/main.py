"""Точка входа FastAPI-приложения EcovedPortal API.

Запускает сервер с эндпоинтами новостей.
Swagger UI доступен по /docs, ReDoc по /redoc.
"""

from fastapi import FastAPI

from src.news.news_router import router as news_router

app = FastAPI(
    title="EcovedPortal API",
    version="0.1.0",
    description="API портала экологического движения Эковеды",
)

# Регистрация роутера новостей
app.include_router(news_router)


@app.get("/api/health")
def health_check():
    """Эндпоинт для проверки работоспособности сервера."""
    return {"status": "ok"}
