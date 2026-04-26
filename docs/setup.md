# Vision Track — Dev Commands & Setup

Este arquivo centraliza **TODOS os comandos importantes do projeto** para evitar perda de tempo e reduzir fricção no onboarding.

Use este documento como referência rápida.

---

# ✅ PRÉ-REQUISITOS

Instale tudo antes de rodar o projeto.

## Node + PNPM

```bash
npm install -g pnpm
```

Verificar:

```bash
node -v
pnpm -v
```

---

## Docker + Compose

Verificar instalação:

```bash
docker --version
docker compose version
```

---

## Python (ML)

Recomendado: **Miniconda**

Criar ambiente:

```bash
conda create -n visiontrack-ml python=3.10
conda activate visiontrack-ml
```

---

## Instalar dependências do ML

Dentro da pasta `ml`:

```bash
pip install -r requirements.txt
```

Se YOLO não estiver:

```bash
pip install ultralytics
```

Se Label Studio não estiver:

```bash
pip install label-studio
```

---

# 🚀 ORDEM CORRETA PARA SUBIR O PROJETO

Sempre siga:

```
1️⃣ Docker (banco)
2️⃣ Prisma migrate
3️⃣ Server
4️⃣ ML service
```

Isso evita 90% dos erros.

---

# 🐳 DOCKER

## Pré-requisitos do Docker

1. **Abra o Docker Desktop** no seu computador antes de rodar os comandos.
2. **Crie o arquivo `.env`** na raiz do projeto copiando o `.env.example`:

```bash
cp .env.example .env
```

---

## Subir containers

```bash
docker compose up -d
```

---

## Buildar containers

```bash
docker compose up -d --build
```

---

## Parar containers

```bash
docker compose down
```

---

## RESET TOTAL (apaga banco)

```bash
docker compose down -v
```

---

## Ver containers rodando

```bash
docker ps
```

Todos:

```bash
docker ps -a
```

---

## Ver imagens

```bash
docker images
```

---

## Entrar no container

```bash
docker exec -it NOME_DO_CONTAINER bash
```

ou

```bash
docker exec -it NOME_DO_CONTAINER sh
```

---

## Limpar cache pesado

```bash
docker system prune
```

Modo agressivo:

```bash
docker system prune -a
```

---

# 🧠 PRISMA (rodar dentro de `/server`)

> **Nota para usuários de Windows:** Recomendamos usar `npx prisma` em vez de `pnpm prisma` para evitar erros de permissão de execução de scripts do PowerShell.

## Gerar client

```bash
npx prisma generate
```

---

## Criar migration

```bash
npx prisma migrate dev
```

---

## Resetar banco

⚠️ apaga tudo

```bash
npx prisma migrate reset
```

---

## Abrir GUI do banco

```bash
npx prisma studio
```

---

# 🖥️ SERVER (NestJS)

Ir para pasta:

```bash
cd server
```

---

## Instalar deps

```bash
pnpm install
```

---

## Rodar em dev

```bash
pnpm start:dev
```

---

## Build

```bash
pnpm build
```

---

## Rodar produção local

```bash
pnpm start:prod
```

---

## Lint

```bash
pnpm lint
```

---

## Testes

```bash
pnpm test
pnpm test:e2e
pnpm test:cov
```

---

## Criar módulo/resource automaticamente

Exemplo:

```bash
nest g resource modules/users
```

Sem arquivos de teste:

```bash
nest g resource modules/users --no-spec
```

---

## Criar vários módulos de uma vez (Git Bash / Linux / Mac)

```bash
for module in users auth companies plans modules inspections ai-models images uploads billing subscriptions
do
  nest g resource modules/$module --no-spec
done
```

---

# 🤖 ML SERVICE (FastAPI)

Ativar ambiente:

```bash
conda activate visiontrack-ml
```

Ir para pasta:

```bash
cd ml
```

---

## Subir FastAPI

```bash
uvicorn src.api.main:app --reload
```

Swagger:

```
http://localhost:8000/docs
```

---

# 🔥 YOLO (Ultralytics)

## Treinar Object Detection

```bash
yolo detect train model=yolov8n.pt data=data.yaml epochs=50
```

---

## Treinar Classificação

```bash
yolo classify train model=yolov8n-cls.pt data=. epochs=30
```

---

## Rodar previsão (inference)

```bash
yolo detect predict model=best.pt source=imagem.jpg
```

Resultados:

```
runs/detect/predict
```

---

## Validar modelo

```bash
yolo detect val model=best.pt data=data.yaml
```

---

# 🏷️ LABEL STUDIO

## Rodar

```bash
label-studio
```

Abrir:

```
http://localhost:8080
```

---

# 🐍 Comandos úteis Python

Ver versão:

```bash
python --version
```

Listar libs:

```bash
pip list
```

Instalar lib:

```bash
pip install nome_da_lib
```

Exportar requirements:

```bash
pip freeze > requirements.txt
```

---

# 📦 GIT (bônus — essenciais)

## Novo branch

```bash
git checkout -b feature/nome-da-feature
```

---

## Status

```bash
git status
```

---

## Commit

```bash
git add .
git commit -m "feat: descrição"
```

---

## Push

```bash
git push origin nome-da-branch
```

---

# ⚠️ NUNCA COMMITAR

Adicione ao `.gitignore`:

```
node_modules
dist
.env
coverage
runs/
__pycache__
generated/
*.log
```

---

# 💡 DICAS DE ENGENHEIRO SENIOR

## Quando algo quebrar misteriosamente:

O ritual universal:

```bash
docker compose down -v
docker compose up -d --build
pnpm prisma migrate dev
```

Funciona mais do que deveria 🙂

---

## Mantenha sempre essa ordem mental:

👉 Infra (Docker)
👉 Banco (Prisma)
👉 Backend
👉 ML

Nunca o contrário.

---

## Extra (ALTAMENTE recomendado futuramente)

Crie automações com:

* **Makefile**
  ou
* **Taskfile**

Exemplo:

```
make dev
make reset
make ml
```

Você nunca mais vai decorar comandos.
