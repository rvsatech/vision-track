# Server Architecture

## Pattern

Backend baseado em **NestJS Modular Architecture**.

Camadas:

Controller → entrada HTTP  
Service → regras de negócio  
Prisma → acesso a dados  

---

## Core Concepts

### Multi-Tenant
Toda entidade pertence a uma empresa (`companyId`).

Nenhuma query deve ser feita sem esse filtro.

---

### Modules

| Module | Responsibility |
|--------|---------------|
| auth | autenticação e autorização |
| users | gestão de usuários |
| companies | gestão de tenants |
| plans | controle de planos SaaS |
| modules | features do produto |
| ai-models | modelos de visão computacional |
| inspections | resultados das análises |
| uploads | entrada de imagens |

---

## Design Principles

- Services não acessam dados de outras empresas
- Controllers são finos
- Regras vivem nos services
- Prisma é a única camada de acesso ao banco
