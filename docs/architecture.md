# Vision Track — Architecture

  nmnb;mnm      m

---

## 2. Architecture & Modules
O sistema é dividido em aplicações principais:

### 2.1 Client (Frontend)
Responsável pela interface do usuário.
- **Stacks:** Next.js, Tailwind, Tanstack Query

### 2.2 Server (Backend)
Backend principal baseado no padrão **Modular Monolith** usando **NestJS**.

**Camadas do NestJS:**
- **Controller** → entrada HTTP
- **Service** → regras de negócio e validações
- **Prisma** → acesso a dados

**Domínios (Modules):**
- `core/auth`: Autenticação e JWT
- `core/users`: Gestão de usuários
- `core/companies`: Gestão de tenants
- `core/plans` & `core/subscriptions`: SaaS billing logic
- `ai/ai-models` & `ai/inspections`: Orquestração da inteligência artificial
- `platform/uploads` & `platform/billing`: Infraestrutura e storage

**Stack:** NestJS, Prisma ORM, PostgreSQL

### 2.3 ML Service (AI Pipeline)
Serviço isolado responsável pelo treinamento e inferência.
- **Fluxo:** Upload → Storage → Model Inference → Inspection Persist → API Response
- **Tarefas de Visão Computacional:** Object Detection, Image Classification (Futuro: Segmentation, Video Analysis).
- **Stack Inicial:** Python, YOLOv8, Roboflow (Dataset), FastAPI.

---

## 3. Database & Tenancy Strategy

**Provider:** PostgreSQL
**ORM:** Prisma (Escolhido por ter tipagem forte e migrations seguras).

### Multi-Tenancy (Isolamento de Tenant)
A abordagem adotada é **Shared Database + Tenant Isolation**.
- Todas as tabelas possuem `companyId`.
- As `Companies` são o topo da hierarquia relacional.
- Usuários, Modelos e Inspeções pertencem estritamente a uma `companyId`.

**Security Enforcement no Backend:**
- Nenhuma query de serviço deve ser executada sem filtrar o `companyId` do usuário logado:
  ```ts
  where: { companyId: user.companyId }
  ```
- Services nunca devem expor dados cross-tenant acidentalmente.

---

## 4. Architectural Style & Future Evolution

Adotamos a arquitetura de **Modular Monolith** com forte inspiração em **Domain-Driven Design (Bounded Contexts)**.
- **Motivos:** Menor complexidade inicial, deploy simples (um único servidor Node), mas altamente desacoplado.
- **Evolução Futura (Microservices):** Caso necessário no futuro, serviços de ML ou filas de Upload de imagens pesadas podem ser facilmente destacados em microservices independentes, pois a comunicação interna no Monólito já é feita via Services isolados.

---

## 5. Entendendo o DDD (De forma simples!)

O **Domain-Driven Design (DDD)**, ou Projeto Orientado a Domínio, parece um termo complicado, mas a ideia é muito simples e se baseia em como empresas reais funcionam.

### 🏢 A Analogia do Supermercado
Imagine um grande supermercado. Ele é dividido em "departamentos":
- **Padaria**: Só se preocupa com pães, fornos e padeiros.
- **Açougue**: Só se preocupa com carnes, facas e geladeiras.
- **Caixa/Faturamento**: Só se preocupa em passar compras e cobrar o cliente.

O padeiro não precisa saber como o caixa aprova um cartão de crédito. Se o sistema do cartão de crédito quebrar (ou for trocado da Cielo para a Stone), **o padeiro continua assando pães normalmente**. Eles são "domínios" isolados.

### 💻 Como isso se aplica ao nosso Código?
Em vez de jogar todo o código misturado num "Saco de Gatos" (o que chamamos de código espaguete), nós dividimos o nosso sistema (`server/src/modules/`) em **Departamentos Independentes**:

1. **Módulo `Core` (A Administração):** Cuida de Empresas, Usuários e Planos. Ele não faz ideia do que é uma imagem ou modelo de IA.
2. **Módulo `AI` (A Linha de Produção Especializada):** Só entende de Inspeções e Visão Computacional. Ele não liga se a empresa está pagando a mensalidade por PIX ou Cartão.
3. **Módulo `Platform` (A Infraestrutura):** Cuida de guardar arquivos (`Uploads`) e cobrar as assinaturas (`Billing`).

### 🌟 O Superpoder dessa Arquitetura (Exemplo Prático)
Imagine que hoje nosso sistema usa a API do **Roboflow** para identificar defeitos em peças. Todo esse código do Roboflow fica **trancado e isolado** dentro do departamento `AI`.

Se amanhã o Roboflow ficar muito caro e decidirmos mudar para o **Google Vision** (ou um modelo próprio local), nós mexemos *apenas* no departamento de `AI`. 
O departamento de Autenticação (`Core`) ou o sistema de Pagamentos (`Billing`) **nem ficam sabendo que a troca existiu**. O sistema não quebra em "efeito dominó"! Isso é o que torna o código seguro, escalável e à prova de mudanças.
