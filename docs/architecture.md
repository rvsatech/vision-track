=# Vision Track — Architecture

## Overview

Vision Track é uma plataforma SaaS de visão computacional para inspeção industrial.

O sistema permite que empresas utilizem modelos de IA para detectar defeitos, riscos operacionais e validar processos através de imagens.

---

## Architecture

O sistema é dividido em três aplicações principais:

### Client
Frontend responsável pela interface do usuário.

Stacks:
- Next.js
- Tailwind
- Tanstack Query

---

### Server
Backend responsável por:

- autenticação
- gestão de empresas (multi-tenant)
- controle de planos
- orquestração de modelos de IA
- armazenamento de resultados

Stack:

- NestJS
- Prisma
- PostgreSQL

---

### ML Service
Serviço responsável pelos modelos de visão computacional.

Responsabilidades:

- treinamento de modelos
- versionamento
- inference
- comunicação com o backend

Stack inicial:

- Python
- YOLOv8
- Roboflow (dataset / labeling)

---

## Architectural Style

**Modular Monolith**

Motivos:

- mais simples de manter
- fácil evolução para microservices
- menor custo operacional
- ideal para early-stage SaaS

---

## Future Evolution

Possíveis separações futuras:

- ML → microservice isolado
- uploads → fila + workers
- inference → processamento assíncrono
