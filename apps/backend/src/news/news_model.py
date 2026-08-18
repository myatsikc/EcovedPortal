"""SQLModel-модель для таблицы новостей.

Заготовка для будущего подключения PostgreSQL.
Пока не используется для чтения данных — данные отдаются из заглушки (news_stub.py).
"""

from datetime import datetime

from sqlmodel import Field, SQLModel


class News(SQLModel, table=True):
    """Модель новости.

    Поля соответствуют будущей таблице `news` в PostgreSQL.
    """

    id: int = Field(default=None, primary_key=True)
    content: str = Field(sa_type="TEXT")
    date: datetime = Field(default_factory=datetime.now)
    image_url: str = Field(max_length=1000)
