# VisionTrack — Documento Base do Projeto

## 🎯 Definição Objetiva

VisionTrack é uma plataforma de inspeção visual automatizada.

Ela permite que empresas enviem imagens de produtos ou processos visuais e recebam automaticamente uma análise, como:

- detecção de defeitos
- classificação de problemas
- score de confiança
- histórico de inspeções

**Em uma frase:**

> *"O VisionTrack analisa imagens e ajuda empresas a tomar decisões com base em visão computacional."*
> 

## 🧩 Problema Real que o Projeto Resolve

Em ambientes industriais e operacionais:

- inspeções são manuais
- dependem de operadores humanos
- não são padronizadas
- não geram histórico confiável
- causam retrabalho e prejuízo

**O VisionTrack resolve isso ao:**

- automatizar análises visuais
- padronizar decisões
- registrar resultados
- permitir auditoria e métricas

## 🧠 O que o Sistema Analisa (Conceito-Chave)

O VisionTrack **não analisa tudo ao mesmo tempo**.

Ele funciona por **Projetos de Inspeção**.

### 📁 Projeto de Inspeção

Um **Projeto** representa:

- um tipo específico de item analisado
- um objetivo claro
- um modelo de ML associado

**Exemplos de Projetos**

- Inspeção de Bobinas
- Inspeção de Peças Usinadas
- Inspeção de Embalagens

<aside>
📌 Cada projeto:

- analisa **uma coisa específica**
- tem regras próprias
- pode evoluir de forma independente
</aside>

## 🧍 Como uma Empresa Usa o VisionTrack (Fluxo Simples)

**1️⃣ Acesso**

- Usuário faz login
- Escolhe um projeto de inspeção

**2️⃣ Envio da Imagem**

- Foto do produto (celular, tablet, câmera)
- Upload simples pela interface

**3️⃣ Análise Automática**

- Sistema executa inferência via ML
- Detecta defeitos ou padrões

**4️⃣ Resultado**

- Tipo do problema
- Score de confiança
- Destaque visual na imagem

**5️⃣ Histórico**

- Resultado fica salvo
- Pode ser auditado depois

<aside>
🔎 **O usuário não vê IA, modelo ou código. Ele vê uma decisão clara.**

</aside>

## 💡 Por que uma Empresa Quer Usar Isso

- Menos erro humano
- Menos perda de material
- Inspeção padronizada
- Histórico confiável
- Decisões baseadas em dados

## 🏗️ Visão Técnica de Alto Nível

```
Frontend Web
    ↓
API Backend
    ↓
Serviço de Inferência ML
    ↓
Banco de Dados
```

## 🧰 Stack Tecnológica

### Frontend

- Next.js (App Router)
- TypeScript
- Auth.js (NextAuth)
- React Hook Form
- Zod
- TanStack Query
- Client API gerado (Kobb)

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger (OpenAPI)

### Machine Learning

- Python
- PyTorch
- YOLO (ou modelo simples)
- Dataset pequeno
- Inferência integrada

### Infraestrutura

- Docker
- Docker Compose
- GitHub Actions (CI)

## 🧱 Arquitetura do Backend (DDD Light)

```
src/
  ├── modules/
  │   ├── auth/
  │   ├── users/
  │   ├── organizations/
  │   ├── projects/
  │   ├── inspections/
  │   └── ml/
  ├── shared/
  └── infra/
```

**Responsabilidades**

- **Auth** → login, sessão, permissões
- **Organizations** → empresas / times
- **Projects** → tipos de inspeção
- **Inspections** → uploads e resultados
- **ML** → inferência isolada

## 🔄 Fluxo Técnico do Backend

1. Usuário autenticado envia imagem
2. API valida:
    - usuário
    - organização
    - projeto
3. Imagem é armazenada
4. Inspeção é registrada no banco
5. Serviço de ML executa inferência
6. Resultado é salvo
7. Resposta retorna ao frontend

## 🖥️ Frontend — Visão Funcional

**Telas Principais**

- Login
- Dashboard
- Projetos
- Upload de imagem
- Resultado da inspeção
- Histórico

**Boas Práticas**

- Server Components quando possível
- Forms com Zod + React Hook Form
- API tipada
- SSR quando faz sentido

## 🤖 Machine Learning — Visão Prática

**Objetivo do ML**

Responder apenas: **"O que aparece nessa imagem?"**

**Pipeline Simples**

1. Escolher um defeito/problema
2. Coletar poucas imagens
3. Anotar dados
4. Treinar modelo pré-pronto
5. Validar resultados
6. Exportar modelo
7. Usar na inferência

**Estrutura Sugerida**

```
ml/
  ├── data/
  ├── train.py
  ├── infer.py
  └── model.pt
```

<aside>
📌 Nada acadêmico. Foco em integração.

</aside>

## 🤝 Uso de IA no Desenvolvimento

IA é usada para:

- gerar testes
- sugerir refatorações
- revisar código
- acelerar documentação

<aside>
⚠️ **IA não define arquitetura.**

</aside>

## 🐳 Infraestrutura

**Docker**

- Frontend containerizado
- Backend containerizado
- Banco via Docker Compose

**CI/CD**

Pipeline simples:

- install
- lint
- test
- build
- docker build