# Vision Track — Guia de Setup & Comandos

Bem-vindo ao Vision Track! Reduzimos a complexidade do onboarding com um CLI interativo nativo para Windows.

---

## ⚡ Inicialização Rápida (Recomendado)

Na raiz do projeto, disponibilizamos o script **`dev.bat`**.
Basta dar um duplo clique nele pelo seu Explorador de Arquivos, ou rodar no terminal `.\dev.bat` e um menu interativo aparecerá.

Use o menu para, na ordem correta:
1. Subir o banco de dados via Docker.
2. Aplicar as Migrations do Prisma.
3. Gerar o Client do Prisma.
4. Iniciar o backend NestJS localmente.

Isso previne a maioria dos erros de configuração de portas e restrições de shell no Windows.

---

## 📦 Pré-requisitos Manuais

Certifique-se de que sua máquina possui:
- **Node.js** (v18+) e **pnpm** (`npm install -g pnpm`)
- **Docker Desktop** rodando em background.
- **Python 3.10+** (Para o ambiente de ML local).

### Arquivo `.env`
Antes de rodar a automação ou o docker, crie o seu arquivo de ambiente na raiz do projeto (basta clonar o exemplo existente):
```bash
cp .env.example .env
```

---

## 🧠 Comandos Avançados (Manuais)

Caso precise rodar comandos isolados sem a interface do `.bat`:

### Prisma (Executar dentro da pasta `/server`)
> 💡 *Sempre use `npx prisma` para evitar problemas de restrição de scripts no Powershell do Windows.*
- Resetar banco inteiro: `npx prisma migrate reset`
- Abrir GUI do Banco de Dados: `npx prisma studio`

### NestJS (Executar dentro da pasta `/server`)
- Fazer build para Produção: `pnpm build`
- Instalar bibliotecas ou reinstalá-las: `pnpm install`

---

## 🤖 Ambiente de Machine Learning (Python)

O ML roda em um ecossistema separado e não é automatizado pelo `.bat` devido ao peso e características das dependências do Python.

1. **Ativar Ambiente Virtual (Ex: Miniconda)**
   ```bash
   conda create -n visiontrack-ml python=3.10
   conda activate visiontrack-ml
   ```
2. **Instalar Dependências**
   ```bash
   cd ml
   pip install -r requirements.txt
   ```
3. **Subir a API FastAPI do Modelo**
   ```bash
   uvicorn src.api.main:app --reload
   ```

*(Para treinar YOLOv8 ou rodar inferências cruas pelo terminal, consulte a documentação detalhada dentro da pasta `/ml`).*
