# VisionTrack

## 🎯 O que é

O **VisionTrack** é uma plataforma SaaS de inspeção visual que utiliza **modelos de IA treinados (Roboflow)** para analisar imagens enviadas por usuários e retornar informações úteis automaticamente.

O sistema já está funcional como MVP, com autenticação, multi-tenant, controle de permissões e integração com IA real.

---

## 🧠 O que o sistema faz hoje

O VisionTrack atualmente permite:

- Autenticação com JWT
- Controle de permissões (roles: USER, ADMIN, SUPER_ADMIN)
- Multi-tenant (empresas isoladas)
- Upload de imagens (via URL pública)
- Criação de inspeções automáticas com IA
- Retorno de análise baseada em modelo treinado no Roboflow
- Histórico de inspeções por empresa

---

## 🤖 Como a IA funciona

O sistema utiliza um modelo treinado no **Roboflow** para:

- Identificar equipamentos de segurança em imagens
- Retornar dados estruturados sobre a imagem
- Gerar um resultado com:
  - tipo de objeto detectado
  - confiança (confidence score)
  - informações adicionais em JSON

### Fluxo atual:
## 🏗️ Arquitetura

Frontend (em desenvolvimento)
↓
NestJS API
↓
Prisma ORM
↓
PostgreSQL
↓
Roboflow API (IA)


---

## 📦 Módulos principais

- Auth (JWT + roles)
- Users (gestão por empresa)
- Companies (multi-tenant SaaS)
- Uploads (imagens via URL)
- Inspections (resultados da IA)
- Plans (estrutura SaaS)

---

## 🐳 Infraestrutura

O projeto roda com Docker:

- Backend NestJS containerizado
- Banco PostgreSQL em container separado
- Estrutura preparada para escalabilidade

---

## 📊 Estado atual do produto

O VisionTrack já possui:

- Backend SaaS funcional
- Pipeline de IA integrado
- Estrutura multi-tenant completa
- Histórico de inspeções persistido
- Autenticação e autorização

---

## 🚀 Próximos passos

### Frontend
- Dashboard de inspeções
- Upload de imagens via interface
- Visualização de resultados da IA
- Gestão de empresas e usuários

### Evolução de IA
- Suporte a múltiplos modelos (diferentes tipos de inspeção)
- Histórico comparativo de detecções
- Melhor estrutura de versionamento de modelos

### Uploads
- Migração de URL pública → storage local (ou S3)
- Processamento assíncrono de imagens

---

## 💡 Visão do produto

O VisionTrack evolui como uma plataforma de inspeção visual baseada em IA, focada em:

- automação de inspeções
- redução de erro humano
- histórico auditável de análises
- suporte a múltiplos tipos de modelos de visão computacional

---

## 🔥 Resumo

O VisionTrack já é um SaaS funcional com IA real integrada, multi-tenant e pronto para expansão de frontend, storage de imagens e novos modelos de inspeção.