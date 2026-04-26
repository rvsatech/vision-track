@echo off
setlocal
chcp 65001 >nul

:menu
cls
echo =======================================================
echo              VISION TRACK - DEV TASK RUNNER
echo =======================================================
echo.
echo   [1] Subir Banco de Dados (Docker Postgres)
echo   [2] Parar Banco de Dados (Docker Down)
echo   [3] Aplicar Migrations (Prisma Migrate)
echo   [4] Gerar Client (Prisma Generate)
echo   [5] Iniciar Backend (NestJS Dev)
echo   [6] Rodar Testes (NestJS Jest)
echo   [7] RESETAR TUDO (Docker Down -v)
echo   [0] Sair
echo.
echo =======================================================
set /p option="Escolha uma opcao: "

if "%option%"=="1" goto start_db
if "%option%"=="2" goto stop_db
if "%option%"=="3" goto prisma_migrate
if "%option%"=="4" goto prisma_generate
if "%option%"=="5" goto start_nest
if "%option%"=="6" goto test_nest
if "%option%"=="7" goto clean_all
if "%option%"=="0" exit /b
goto menu

:start_db
echo.
echo Iniciando banco de dados no Docker...
docker compose up -d postgres
echo.
pause
goto menu

:stop_db
echo.
echo Parando containers...
docker compose down
echo.
pause
goto menu

:prisma_migrate
echo.
echo Aplicando migrations no banco de dados...
cd server && npx prisma migrate dev
cd ..
echo.
pause
goto menu

:prisma_generate
echo.
echo Gerando cliente do Prisma...
cd server && npx prisma generate
cd ..
echo.
pause
goto menu

:start_nest
echo.
echo Iniciando servidor NestJS...
cd server && pnpm start:dev
cd ..
pause
goto menu

:test_nest
echo.
echo Rodando testes unitarios...
cd server && pnpm test
cd ..
pause
goto menu

:clean_all
echo.
echo ATENCAO! Isso vai apagar os conteineres e o VOLUME do banco de dados (dados perdidos).
set /p confirm="Tem certeza que deseja continuar? (s/n): "
if /i "%confirm%" neq "s" goto menu
docker compose down -v
echo Tudo foi apagado!
pause
goto menu
