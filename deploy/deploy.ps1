# Деплой EcovedPortal. Запускать НА СЕРВЕРЕ из репозитория.
#
#   powershell -ExecutionPolicy Bypass -File C:\ecoved-portal\deploy\deploy.ps1
#
# Что происходит: проверка .env -> git pull -> остановка контейнеров -> сборка и
# запуск -> проверка, что HTTPS реально отвечает. Остановка на любой ошибке.
#
# Файл лежит в репозитории, поэтому обновляется вместе с кодом. Запущенный экземпляр
# PowerShell читает себя целиком при старте, так что скрипт может обновить сам себя —
# новые правки применятся со следующего запуска.

param(
    # Куда клонирован репозиторий на сервере.
    [string] $Repo = "C:\ecoved-portal",

    # Ветка, из которой живёт сайт.
    [string] $Branch = "master"
)

$ErrorActionPreference = "Stop"

Write-Host "=== Деплой EcovedPortal ===" -ForegroundColor Cyan

# --- Шаг 0: проверка конфигурации.
#
# Почему до сборки, а не после: с отсутствующим .env или с CADDY_TLS=internal
# контейнеры поднимутся «healthy», а ошибка проявится только как предупреждение
# браузера у посетителей. Проверка стоит здесь именно поэтому.
if (-not (Test-Path $Repo)) {
    Write-Host "ОШИБКА: нет каталога $Repo" -ForegroundColor Red
    exit 1
}
Set-Location $Repo

$envFile = Join-Path $Repo ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "ОШИБКА: нет $envFile — боевая конфигурация не в репозитории?" -ForegroundColor Red
    exit 1
}
if (-not (Select-String -Path $envFile -Pattern "^\s*CADDY_SITE_ADDRESS\s*=.*zelenavorona\.ru" -Quiet)) {
    Write-Host "ОШИБКА: в $envFile нет CADDY_SITE_ADDRESS с zelenavorona.ru" -ForegroundColor Red
    exit 1
}
# internal на сервере = сайт отдаёт сертификат собственного CA Caddy, браузер
# посетителя его не знает.
if (Select-String -Path $envFile -Pattern "^\s*CADDY_TLS\s*=\s*internal\s*$" -Quiet) {
    Write-Host "ОШИБКА: в $envFile стоит CADDY_TLS=internal — это режим разработки." -ForegroundColor Red
    Write-Host "На сервере должен быть адрес почты для Let's Encrypt." -ForegroundColor Red
    exit 1
}
Write-Host "Конфигурация: OK"

# --- Шаг 1: код.
#
# --ff-only: если на сервере локально правили файлы, pull остановится здесь, а не
# создаст merge-commit, из-за которого на сервере окажется непредсказуемая смесь.
Write-Host "Код: git pull origin $Branch"
git pull --ff-only origin $Branch
if ($LASTEXITCODE -ne 0) {
    Write-Host "ОШИБКА: git pull не выполнен (код $LASTEXITCODE). На сервере есть локальные правки?" -ForegroundColor Red
    exit 1
}

# --- Шаг 2: остановка.
#
# Флаг -v НЕ добавлять: в томе ecovedportal_caddy_data лежат сертификат и ключ
# аккаунта ACME. Повторный выпуск упирается в лимит Let's Encrypt (50 на домен
# в неделю), а потеря ключа аккаунта означает выпуск нового аккаунта.
Write-Host "Остановка контейнеров..."
docker compose down --remove-orphans
if ($LASTEXITCODE -ne 0) { Write-Host "ОШИБКА: docker compose down (код $LASTEXITCODE)" -ForegroundColor Red; exit 1 }

Write-Host "Сборка и запуск (несколько минут)..."
docker compose up -d --build
if ($LASTEXITCODE -ne 0) { Write-Host "ОШИБКА: docker compose up (код $LASTEXITCODE)" -ForegroundColor Red; exit 1 }

# --- Шаг 3: проверка HTTPS.
#
# Первый выпуск сертификата занимает 30-60 с, поэтому с повторами.
#
# --resolve подставляет 127.0.0.1 вместо DNS: проверка идёт на свой же контейнер,
# а не обходит интернет через публичный IP (с самого сервера домен может
# резолвиться не на внутренний адрес, а публичного проброса «волосатой петлёй»
# на некоторых роутерах нет вовсе).
Write-Host ""
Write-Host "Проверка HTTPS (первый выпуск сертификата до 60 секунд)..." -ForegroundColor Yellow
$healthy = $false
for ($i = 1; $i -le 8; $i++) {
    Start-Sleep -Seconds 10
    $code = curl.exe -sk -o NUL -w "%{http_code}" --resolve zelenavorona.ru:443:127.0.0.1 https://zelenavorona.ru/api/health
    Write-Host "  попытка $i : HTTP $code"
    if ($code -eq "200") { $healthy = $true; break }
}

Write-Host ""
if ($healthy) {
    # Редирект с HTTP: без него посетитель, набравший http://, останется на HTTP.
    $redirect = curl.exe -s -o NUL -w "%{http_code}" --resolve zelenavorona.ru:80:127.0.0.1 http://zelenavorona.ru/
    $www = curl.exe -sk -o NUL -w "%{http_code}" --resolve www.zelenavorona.ru:443:127.0.0.1 https://www.zelenavorona.ru/api/health
    Write-Host "=== Готово ===" -ForegroundColor Green
    Write-Host "Сайт:            https://zelenavorona.ru"
    Write-Host "Редирект с HTTP: HTTP $redirect (ожидался 308)"
    Write-Host "www:             HTTP $www (ожидался 200)"
    Write-Host ""
    Write-Host "Если из браузера сайт не открывается, а здесь всё зелёное — проблема"
    Write-Host "в пробросе портов 80/443 на роутере или в A-записи домена."
} else {
    Write-Host "=== HTTPS не отвечает ===" -ForegroundColor Red
    Write-Host "Причина отказа Let's Encrypt пишется в логах в строках с 'acme':" -ForegroundColor Yellow
    docker compose logs --tail=60 caddy
    Write-Host ""
    Write-Host "Что смотреть:" -ForegroundColor Yellow
    Write-Host "  'Connection refused' / таймаут  -> роутер не пробрасывает 80/443 на этот сервер"
    Write-Host "  'no such host'                  -> A-запись домена не указывает на 95.165.12.202"
    Write-Host "  'too many certificates'         -> выпуск заблокирован на неделю, поможет только ожидание"
    Write-Host "  порт 80 занят на Windows        -> netstat -ano | findstr :80, обычно IIS/HTTP.sys"
}

Write-Host ""
Write-Host "Логи:   docker compose logs -f caddy" -ForegroundColor DarkGray
Write-Host "Статус: docker compose ps" -ForegroundColor DarkGray
