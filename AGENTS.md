# Инструкции для ИИ-агентов (EcovedPortal)

## Справочная информация
- **Проект:** EcovedPortal — портал небольшого экологического движения (около 30 волонтеров).
- **Аудитория:** Несколько тысяч посетителей, заходящих на сайт периодически.
- **Язык разработки:** Python.
- **Команда:** Один разработчик.
- **Среда разработки:** VS Code.

## Ключевые характеристики архитектуры
- **Осуществимость:** Портал разрабатывается без финансовой поддержки, на энтузиазме одного человека. Стек должен быть простым и бесплатным.
- **Развертываемость:** Портал должен легко переезжать между хостингами. Контейнерная архитектура (Docker) поддерживает это требование.
- **Эволюционность:** Нужен минимальный путь от идеи до внедрения любой новой фичи. Код должен быть модульным и понятным.
- **Масштабируемость:** Требования к масштабируемости отсутствуют.

## Архитектурный стиль
Проект построен на основе **клиент-серверной архитектуры** с использованием **REST API** для взаимодействия между клиентскими приложениями (фронтенд, админка) и серверной логикой. Бэкенд выступает как единый источник данных и бизнес-логики, предоставляя доступ к базе данных через стандартизированные эндпоинты. Клиентская часть реализована как **SPA (Single Page Application)** с использованием React, что обеспечивает интерактивность и плавность пользовательского опыта.

Для обеспечения надежности и переносимости используется **контейнеризованная архитектура (Docker)**. Каждый компонент системы (бэкенд, фронтенд, БД) инкапсулирован в отдельный контейнер. Это соответствует принципам **Cloud-Native** разработки, позволяя легко перемещать проект между средами без конфликтов зависимостей.

## Стек технологий
### Фронтенд
- **Фреймворк:** Next.js (React).
- **Язык:** TypeScript.
- **UI Библиотека:** Material UI (MUI).
- **Инструменты:** Визуальное редактирование интерфейса через React Designer.
- **Управление данными:** TanStack Query (для взаимодействия с REST API).

### Бэкенд
- **Язык:** Python.
- **Фреймворк:** FastAPI.
- **Работа с БД:** SQLModel (ORM).
- **База данных:** PostgreSQL.
- **Стиль взаимодействия:** API-First (все данные отдаются через REST API).

## Общие инструкции
- Никогда меня не хвали. Не коменируй позитивно мои предположения и предложения.
- **Процесс разработки:** 1. От `main` создаем ветку. 2. В ней: Бизнес-требования -> Утверждение -> Технические спецификации -> Генерация кода -> Тестирование. 3. После готовности: Мерж в `main` -> Деплой.
- **Никогда не инициируйте `git commit` или `git push` без явного указания пользователя.**
- **Комментирование кода (AI-First практики):**
  - Используйте docstrings (Google/PEP 257 для Python, JSDoc для TypeScript).
  - Комментируйте **ЗАЧЕМ** и **КАК**, а не **ЧТО** делает код. Избегайте дублирования логики комментариями.
  - Обновляйте комментарии при изменении кода.
  - Для AI-сгенерированных сложных блоков используйте метку `// AI-Generated: [описание]` или `# AI-Generated: [описание]`.
  - Следуйте стандартам PEP 8 и ESLint проекта.
- **Структура и именование:**
  - Все файлы раздела используют единый префикс (например, `news-`, `volunteers-`, `auth-`).
  - Бизнес-требования: `docs/business-requirements/{prefix}-requirements.md`
  - Технические спецификации: `docs/technical-specs/{prefix}-spec.md`
  - Код проекта: `apps/backend/src/{prefix}/`, `apps/frontend/src/{prefix}/`
  - При генерации кода создавайте файлы в соответствующих префиксных папках.

## Работа со скиллами
В корне проекта находится папка `.koda/skills/`. Содержимое файлов в этой папке автоматически применяется как инструкции при соответствующих задачах. Следуйте инструкциям в скиллах `business-requirements.md`, `technical-specs.md` и `code-generation.md` при реализации фич.
- Говори и поясней мне о необходимости настройки инфраструктуры, инструментов и окружения, если нам чего-то не хватает. У меня мало опыта на подобных проектах, я могу упустить очевидные вещи.

## Рекомендации для агентов по результатам работы

### Диагностика ДО планирования
Первое действие при любой проблеме — посмотреть логи контейнеров, а не читать код:
```
docker compose logs --tail=50 caddy frontend backend
```
Логи Caddy показывают, дошёл ли запрос до сервера и выпустился ли сертификат. Логи фронтенда показывают, на какой адрес ходит прокси, какие ошибки возникают. Логи бэкенда показывают, какие запросы приходят и какой статус возвращается.

### Не доверять чужим логам
Логи из файлов (например, `temp_build_log.txt`) могут описывать **старый неудачный билд**. Проверяйте актуальное состояние контейнеров, а не унаследованные артефакты.

### Проверять предположения перед созданием плана
Если обнаруживается, что файлы уже существуют (а не отсутствуют) — не создавайте план действий на основе ложного предположения. Смените курс и ищите проблему в другом месте.

### Параллельное чтение файлов
Все независимые `read_file` вызывайте **параллельно**, не последовательно. Это сокращает время чтения с ~10 минут до ~2 минут.

### Минимальный план диагностики
Перед созданием большого плана — один проверочный шаг:
```
Шаг: docker compose logs --tail=50 frontend
→ увидим ошибку
→ дальше по ситуации
```
Не создавайте план из 5 шагов «вслепую».

### Тестировать локально ДО Docker
`npm run dev` стартует за 3 секунды. Прокси в `next.config.ts` работает без `build-arg`. Предлагайте локальный тест перед пересборкой Docker — это экономит 2+ минуты на каждый цикл.

### Docker — финальная проверка, не инструмент разработки
Docker build занимает 2+ минуты. Используйте его для финальной проверки, а не для отладки. Отлаживайте в IDE через `npm run dev`.

## Боевое окружение (Production)

### Архитектура
Сайт хостится на домашнем сервере (Windows 10 Pro). Для доступа используются RDP (для управления системой) и SSH (для управления Docker-контейнерами).

Схема запроса:

```
Интернет -> домен zelenavorona.ru (A-запись на 95.165.12.202)
         -> роутер 192.168.1.254 (проброс 80/443)
         -> 192.168.1.67:80/443  = контейнер caddy (TLS, редирект HTTP->HTTPS)
         -> frontend:3000        = Next.js (страницы + прокси /api и /static)
         -> backend:8000         = FastAPI (только внутри Docker-сети)
```

### Серверная часть
- **Железо:** Домашний ПК, подключенный к сети.
- **IP:** Локальный статический `192.168.1.67`. (Рабочая машина разработчика при этом на `192.168.1.66` — не путать.) В документации здесь долгое время был ошибочно записан `192.168.1.65`: если на роутере цель проброса осталась `.65`, запросы до Caddy не доходят, а в логах ACME это выглядит как `Connection refused`.
- **Внешний IP:** `95.165.12.202` — статический, куплен у провайдера. На него должны указывать A-записи `zelenavorona.ru` и `www.zelenavorona.ru`; проверка: `Resolve-DnsName zelenavorona.ru` и `Resolve-DnsName www.zelenavorona.ru` (проверено 2026-09-14: обе ведут на `95.165.12.202`).
- **Роутер:** `192.168.1.254` — проброс **80 → 192.168.1.67:80** и **443 → 192.168.1.67:443** (на Caddy). Исторически проброс шёл на порт 3000 — это было конфигурацией без TLS.
- **Домен:** `zelenavorona.ru` + `www.zelenavorona.ru`. Оба имени в одном блоке Caddy, поэтому сертификат покрывает их одним общим выпуском; с `www.` на отдельный адрес сертификат не действует.

### Стек инфраструктуры
1. **Docker Desktop:** Для запуска контейнеров (Backend, Frontend, Caddy).
2. **Docker Compose:** один `docker-compose.yml` и для dev, и для prod — различаются только значения в `.env`. Caddy входит в состав стека всегда.
   - `caddy:80/443` — единственная точка входа наружу
   - `frontend:3000` — проброшен только на `127.0.0.1`, извне недоступен
   - `backend:8000` — только внутренняя Docker-сеть
3. **Caddy:** реверс-прокси и выпуск сертификатов. Конфиг — `deploy/Caddyfile`, параметры окружения — `.env` в корне проекта.

### Конфигурация окружения: .env и .env.dev

Оба файла в репозитории, секретов в них нет (только имя домена и почта ACME). Различаются одним значением — источником сертификата.

| Файл | Для чего | `CADDY_TLS` | Команда |
|---|---|---|---|
| `.env` | сервер | адрес почты (Let's Encrypt) | `docker compose up -d --build` |
| `.env.dev` | рабочая машина | `internal` (CA самого Caddy) | `docker compose --env-file .env.dev up -d --build` |

Compose сам читает только `.env`; `.env.dev` указывают флагом `--env-file` явно.

**Правило без исключений: на рабочей машине compose всегда с `--env-file .env.dev`.** Без флага подхватится `.env` с почтой, Caddy пойдёт выпускать боевой сертификат с машины, куда 80/443 с роутера не проброшены. Проверки домена не пройдут, а неудачи засчитываются в лимиты Let's Encrypt на домен — так уже было: машина зарегистрировала аккаунт ACME и получила две неудачи.

**Если в `.env` появится секрет** (пароль БД, API-ключ) — немедленно вернуть его в `.gitignore` строкой `/.env`, удалить из истории git и хранить на сервере отдельно. Публичный репозиторий = секретов нет.

### HTTPS
- **Сертификат выпускает Caddy** через Let's Encrypt (проверка HTTP-01 по порту 80), продлевает сам. Ручных команд выпуска нет. Почту никуда заранее регистрировать не нужно: Caddy создаёт аккаунт ACME сам при первом выпуске, почта нужна только для уведомлений об истечении.
- **Где лежит:** именованный том Docker `ecovedportal_caddy_data` (внутри — `/data/caddy`). В нём сертификат **и ключ аккаунта ACME**. Том переживает пересоздание контейнера, поэтому деплой не выпускает сертификат заново. `docker compose down -v` том удалит — флаг `-v` в деплое не использовать.
- **Имя тома одинаковое на обеих машинах,** потому что в `docker-compose.yml` задано явное `name: ecovedportal`. Без него Compose берёт имя из имени папки, на сервере том назывался бы иначе, и при переносе Caddy увидел бы пустое хранилище.
- **Параметры в `.env` на сервере:**
  - `CADDY_SITE_ADDRESS=zelenavorona.ru www.zelenavorona.ru` — оба имени в одной строке, иначе для `www.` сертификат не выпускается;
  - `CADDY_TLS=myatsikc@yandex.ru` — e-mail для Let's Encrypt; значение `internal` переключает Caddy на его собственный CA (режим разработки, браузер посетителя такой не знает).
- **HTTPS локально, как в бою:** `.env.dev` уже настроен на домен, поэтому достаточно прописать `127.0.0.1 zelenavorona.ru` в `C:\Windows\System32\drivers\etc\hosts` и импортировать корневой сертификат Caddy (`docker compose --env-file .env.dev cp ecoved-caddy /data/caddy/pki/authorities/local/root.crt root.crt`, затем `Import-Certificate -FilePath root.crt -CertStoreLocation Cert:\LocalMachine\Root`) — иначе браузер покажет предупреждение. Без записи в hosts домен резолвится на внешний адрес, и запрос на сервер не дойдёт.
- **Ограничения Let's Encrypt:** не более 50 сертификатов на домен в неделю и 5 ошибок в час на имя. Многократный перезапуск Caddy с неверным DNS или без проброса 80/443 приводит к паузе до недели — см. диагностику ниже.

### Доступ
- **RDP:** Пользователь `myatsikc_server` (для администрирования Windows).
- **SSH:** Для выполнения команд Docker (`docker compose up...`).

### Диагностика HTTPS

Порядок проверки — от DNS к приложению, каждый шаг сужает круг причин:

```
1. Resolve-DnsName zelenavorona.ru            # должен вернуть 95.165.12.202
2. curl.exe -s -o NUL -w "%{http_code}" http://zelenavorona.ru/     # снаружи: 308 (редирект Caddy)
3. docker compose logs --tail=50 caddy                               # причина отказа ACME
4. docker volume inspect ecovedportal_caddy_data                     # сертификат на месте?
```

- В логах Caddy ищутся строки `[ERROR] acme:` — там прямо написана причина отказа.
- `no such host` / таймаут в логах ACME → DNS или проброс порта 80 не работает.
- `too many certificates` / `rateLimited` → выпуск заблокирован на неделю. Перезапуски не помогают; ждать. Для проверки конфигурации без выпуска сертификата локально: `CADDY_TLS=internal`.
- Сертификат есть, но браузер ругается → домен в логах Caddy отличается от `CADDY_SITE_ADDRESS`, либо A-запись указывает на другой адрес.
- Проверка с самого сервера, где домен может не резолвиться на внутренний адрес: `curl.exe -sk -o NUL -w "%{http_code}" --resolve zelenavorona.ru:443:127.0.0.1 https://zelenavorona.ru/api/health` (флаг `-k` убирает требование валидной цепочки, `--resolve` подставляет 127.0.0.1 вместо DNS).


### Деплой на сервер

Скрипт живёт **только на сервере, вне репозитория** — `C:\deploy-ecoved.ps1`. В git он не лежит: в `deploy/` хранится только `Caddyfile`. Запуск на сервере:

```
powershell -ExecutionPolicy Bypass -File C:\deploy-ecoved.ps1
```

Что делает: проверяет, что в `.env` не остался `CADDY_TLS=internal` (с ним контейнеры поднимаются «healthy», а посетители получают недоверенный сертификат — больше нигде эта ошибка не видна) -> `git pull --ff-only` -> `docker compose down --remove-orphans` (**без `-v`**, иначе том с сертификатом и ключом ACME удалится) -> `docker compose up -d --build` -> с повторами проверяет `https://zelenavorona.ru/api/health`, при неудаче печатает логи Caddy и расшифровку частых причин. Окно PowerShell остаётся открытым и при успехе, и при ошибке.

**Текст ниже — единственная копия скрипта.** На сервере это обычный файл, его легко потерять или перезаписать, поэтому он хранится здесь:

```powershell
# EcovedPortal deploy. Run ON THE SERVER.
#   powershell -ExecutionPolicy Bypass -File C:\deploy-ecoved.ps1
#
# ASCII only on purpose: PowerShell 5.1 reads .ps1 without BOM as ANSI, so any
# non-ASCII text in this file can break the parser.

$Repo   = "C:\ecoved-portal"
$Branch = "master"

$ErrorActionPreference = "Stop"

# Every path ends here, so the window never closes by itself.
function Stop-Here {
    param([string] $Text, [string] $Color, [int] $Code)
    Write-Host ""
    Write-Host $Text -ForegroundColor $Color
    Write-Host ""
    Read-Host "Press Enter to close"
    exit $Code
}

try {
    if (-not (Test-Path $Repo)) { Stop-Here "No folder $Repo" Red 1 }
    Set-Location $Repo

    # Guard: with internal CA the site serves a certificate visitors' browsers do
    # not trust, and containers still report "healthy" - nothing else would show it.
    $envFile = Join-Path $Repo ".env"
    if (-not (Test-Path $envFile)) { Stop-Here "No $envFile - did the repo get updated?" Red 1 }
    if (Select-String -Path $envFile -Pattern "^\s*CADDY_TLS\s*=\s*internal\s*$" -Quiet) {
        Stop-Here "CADDY_TLS=internal in .env - that is the DEV value, not this server" Red 1
    }

    Write-Host "=== 1. git pull ===" -ForegroundColor Cyan
    git pull --ff-only origin $Branch
    if ($LASTEXITCODE -ne 0) {
        Stop-Here "git pull failed (code $LASTEXITCODE). Local edits on the server?" Red 1
    }

    # -v is never added: ecovedportal_caddy_data holds the certificate and the ACME
    # account key. Losing it means a new issuance, which is rate limited by
    # Let's Encrypt (50 per domain per week).
    Write-Host "=== 2. stop containers ===" -ForegroundColor Cyan
    docker compose down --remove-orphans
    if ($LASTEXITCODE -ne 0) { Stop-Here "docker compose down failed (code $LASTEXITCODE)" Red 1 }

    Write-Host "=== 3. build and start ===" -ForegroundColor Cyan
    docker compose up -d --build
    if ($LASTEXITCODE -ne 0) { Stop-Here "docker compose up failed (code $LASTEXITCODE)" Red 1 }

    # First certificate issuance takes 30-60 s, hence the retries.
    # --resolve points at our own container instead of the public IP: from the
    # server itself the domain may not resolve to the internal address.
    Write-Host "=== 4. check HTTPS (first issuance up to 60 s) ===" -ForegroundColor Cyan
    $healthy = $false
    for ($i = 1; $i -le 8; $i++) {
        Start-Sleep -Seconds 10
        $code = curl.exe -sk -o NUL -w "%{http_code}" `
            --resolve zelenavorona.ru:443:127.0.0.1 https://zelenavorona.ru/api/health
        Write-Host "  attempt $i : HTTP $code"
        if ($code -eq "200") { $healthy = $true; break }
    }

    if ($healthy) {
        $redirect = curl.exe -s -o NUL -w "%{http_code}" `
            --resolve zelenavorona.ru:80:127.0.0.1 http://zelenavorona.ru/
        $www = curl.exe -sk -o NUL -w "%{http_code}" `
            --resolve www.zelenavorona.ru:443:127.0.0.1 https://www.zelenavorona.ru/api/health
        Write-Host "=== DONE ===" -ForegroundColor Green
        Write-Host "Site:            https://zelenavorona.ru"
        Write-Host "HTTP redirect:   HTTP $redirect (expected 308)"
        Write-Host "www:             HTTP $www (expected 200)"
        Write-Host ""
        Write-Host "If the browser cannot open it while everything above is green:"
        Write-Host "  router port forward 80/443 -> 192.168.1.67, or the DNS A record."
        Stop-Here "OK" Green 0
    }

    Write-Host "=== HTTPS NOT ANSWERING ===" -ForegroundColor Red
    Write-Host "Let's Encrypt failure reason is in lines containing 'acme':" -ForegroundColor Yellow
    docker compose logs --tail=60 caddy
    Write-Host ""
    Write-Host "What to check:" -ForegroundColor Yellow
    Write-Host "  'Connection refused' / timeout -> router does not forward 80/443 to 192.168.1.67"
    Write-Host "  'no such host'                 -> A record does not point at 95.165.12.202"
    Write-Host "  'too many certificates'        -> issuance blocked for a week, only waiting helps"
    Write-Host "  port 80 taken on Windows       -> Get-NetTCPConnection -State Listen -LocalPort 80,443"
    Stop-Here "FAILED" Red 1
}
catch {
    Stop-Here "ERROR: $($_.Exception.Message)" Red 1
}
```

**Скрипт обязан оставаться без не-ASCII символов.** Windows PowerShell 5.1 читает `.ps1` без BOM как ANSI, поэтому кириллица в тексте разъедает кавычки и файл перестаёт парситься (ошибка вида «В строке отсутствует завершающий символ»). Сохранять в ASCII или UTF-8 с BOM.

### Быстрая проверка на самом сервере

- **`http://localhost:3000`** — сайт в браузере без TLS: порт 3000 опубликован на `127.0.0.1`. Первая загрузка в dev-режиме компилирует страницы 10-30 с.
- **`http://localhost` и `https://localhost` не годятся:** Caddy редиректит на HTTPS, а сертификата для имени `localhost` у него нет — TLS-рукопожатие падает. Проверять только по доменным именам.
- Полный путь через Caddy: `curl.exe -sk --resolve zelenavorona.ru:443:127.0.0.1 https://zelenavorona.ru/api/health` (или прописать `127.0.0.1 zelenavorona.ru` в hosts, тогда откроется и из браузера).
- Ни одна из проверок с самого сервера не доказывает, что работают проброс 80/443 и брендмауэр: `http://192.168.1.67/` с другого устройства в локальной сети и `https://zelenavorona.ru` с телефона по мобильному интернету — вот они.
