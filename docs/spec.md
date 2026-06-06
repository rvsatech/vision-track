# SPEC — Vision Track

## 1. Objetivo

O **Vision Track** é uma plataforma SaaS multiempresa (multi-tenant) de visão computacional focada em inspeção e análise automatizada de imagens. O sistema permite que diferentes empresas realizem o upload de imagens de processos industriais ou comerciais e recebam, em tempo real, inferências de inteligência artificial baseadas em modelos de visão computacional (inicialmente integrados ao **Roboflow** e com suporte futuro para modelos locais treinados em **YOLOv8**).

---

## 2. Contexto

Empresas de diversos setores (indústria, qualidade, segurança, logística) necessitam automatizar a inspeção visual de suas operações (ex: detecção de defeitos, contagem de peças, validação de EPIs). Construir e manter uma infraestrutura própria de modelos de IA, servidores de alta performance, gerenciamento de usuários, isolamento de dados e faturamento de assinatura é caro e demorado. 

O Vision Track resolve essa dor ao prover uma plataforma SaaS unificada onde:
1. Empresas cadastram-se e assinam planos de uso.
2. Usuários enviam imagens via portal web ou API.
3. A plataforma orquestra a chamada de inferência à IA (via Roboflow) e grava de forma auditável os resultados.

---

## 3. Escopo

### 3.1 Dentro do escopo (IN)

- **Arquitetura Multi-Tenant**: Isolamento lógico de dados por empresa (`Company`) compartilhando a mesma base de dados.
- **Autenticação & Autorização**: Controle de acesso por JWT contendo perfis (`SUPER_ADMIN`, `ADMIN`, `USER`).
- **Gestão de Planos**: Cadastro de planos SaaS e vinculação às empresas para controle de acesso/faturamento futuro.
- **Módulo de Inspeção**: Envio de imagens para inferência externa via API do Roboflow e gravação estruturada dos retornos (tempo de inferência, confiança média, JSON completo).
- **Módulo de Uploads**: Upload de mídias e vinculação segura aos registros de inspeção.
- **Interface Web (Client)**: Dashboard administrativo para visualização de métricas, histórico de inspeções, tabelas de dados e configurações.

### 3.2 Fora do escopo (OUT)

- **Treinamento de Modelos em Tempo Real na Web**: O treinamento dos modelos de visão computacional é feito de forma externa (no painel do Roboflow ou via scripts Python offline na pasta `/ml`).
- **Gateway de Pagamento Real (Stripe/Pix)**: No MVP, o faturamento é simulado por atribuição de planos, sem cobrança real integrada via cartões/PIX.
- **Inferência local em tempo real no NestJS**: O monólito do backend delega a inferência pesada para APIs externas (Roboflow) para manter baixa a latência local e consumo de recursos.

---

## 4. Requisitos Funcionais (RF)

- **RF01:** O sistema deve suportar autenticação de usuários via e-mail e senha com geração de token JWT.
- **RF02:** O sistema deve permitir o cadastro de Empresas (Tenants) com nome e CNPJ único.
- **RF03:** O sistema deve permitir o cadastro de Planos de Assinatura com nome, preço e descrição.
- **RF04:** O sistema deve permitir o cadastro de Usuários associados a uma empresa específica.
- **RF05:** O sistema deve filtrar todos os dados e listagens (inspeções, usuários, uploads) pelo ID da empresa do usuário logado (Isolamento de Tenant).
- **RF06:** O sistema deve permitir o envio de uma URL de imagem para inferência na API externa do Roboflow.
- **RF07:** O sistema deve registrar o status da inspeção (`PROCESSING`, `SUCCESS`, `FAILED`), a confiança média retornada, o tempo de inferência (em milissegundos) e o JSON completo do Roboflow.
- **RF08:** O sistema deve permitir o upload e gerenciamento de arquivos de imagens (Uploads).
- **RF09:** O sistema deve disponibilizar um portal web (React/Tailwind) para que o cliente acesse seu histórico de inspeções e perfil.

---

## 5. Requisitos Não Funcionais (RNF)

- **RNF01:** **Isolamento de Dados**: Utilizar a estratégia *Shared Database + Tenant Isolation* via coluna `companyId` em todas as consultas SQL do Prisma.
- **RNF02:** **Performance**: Respostas HTTP das APIs do backend NestJS (excluindo tempo de chamada externa de IA) devem ser inferiores a 200ms.
- **RNF03:** **Segurança**: Senhas de usuários criptografadas com hashing seguro. Implementação de proteção de cabeçalhos (Helmet), controle de acessos (CORS) e limitação de requisições (Rate Limiting).
- **RNF04:** **Escalabilidade**: Estrutura organizada como **Monólito Modular** para permitir fácil transição de domínios específicos (como o pipeline de IA) para microsserviços no futuro.

---

## 6. Regras de Negócio (RN)

- **RN01:** Todo usuário cadastrado (`User`) deve, obrigatoriamente, estar associado a uma Empresa (`Company`).
- **RN02:** Usuários com a role `USER` ou `ADMIN` de uma determinada empresa jamais podem ver dados (inspeções, cadastros) de outras empresas.
- **RN03:** Apenas usuários com a role `SUPER_ADMIN` (administradores globais do SaaS) podem gerenciar Planos (`Plan`) e listar/criar novas Empresas (`Company`).
- **RN04:** O CNPJ de cada empresa deve ser único em toda a base de dados.
- **RN05:** Se o serviço de inferência do Roboflow falhar ou retornar erro, o status da Inspeção no banco de dados deve ser registrado como `FAILED` com o JSON do erro registrado.

---

## 7. Usuários / Roles / Permissões

| Role/Perfil | Descrição | Permissões |
|------------|-----------|------------|
| `SUPER_ADMIN` | Administrador Global do SaaS | Acesso total a todas as rotas de todas as empresas, gestão de planos e criação de tenants. |
| `ADMIN`       | Administrador da Empresa Cliente | Gerenciamento de usuários da sua própria empresa, visualização de logs, relatórios e inspeções da sua empresa. |
| `USER`        | Operador da Empresa Cliente | Criação de novas inspeções (inferências) e consulta do histórico de inspeções da sua empresa. |

---

## 8. Fluxos Principais

### 8.1 Autenticação de Usuário
1. O usuário submete suas credenciais (email e senha) na página de SignIn.
2. O servidor valida a senha cifrada e gera um token JWT contendo `id`, `email`, `role` e `companyId`.
3. O client armazena o token para autenticar requisições futuras via cabeçalho `Authorization: Bearer <token>`.

### 8.2 Realização de Inspeção de Imagem (Roboflow)
1. O usuário submete a URL de uma imagem para inspeção através do endpoint `POST /inspections`.
2. O backend NestJS recebe a requisição, extrai o `companyId` do token JWT do usuário autenticado.
3. O backend dispara uma requisição HTTP contendo a API Key e a URL da imagem para o serviço de inferência do Roboflow (`ROBOFLOW_URL`).
4. O Roboflow analisa a imagem e retorna o JSON estruturado com os bounding boxes, labels e confianças.
5. O backend processa a resposta, calcula a confiança média, registra o registro de `Inspection` com status `SUCCESS` no banco de dados, associado à empresa do usuário.
6. A API retorna os dados criados para o Frontend.

---

## 9. API / Contratos

### 9.1 Padrões Gerais

- **Formato de request/response**: JSON (`application/json`)
- **Autenticação**: HTTP Bearer JWT
- **Padrão de status code**: REST convencional (200, 201, 400, 401, 403, 404, 409, 500)

### 9.2 Endpoints Principais

#### `POST /auth/login`
- **Auth**: Nenhum
- **Request**
  ```json
  {
    "email": "user@company.com",
    "password": "strongpassword"
  }
  ```
- **Response (200)**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### `GET /auth/me`
- **Auth**: JWT (Qualquer Role)
- **Response (200)**
  ```json
  {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@company.com",
    "role": "ADMIN",
    "companyId": 2
  }
  ```

#### `POST /inspections`
- **Auth**: JWT (`ADMIN` ou `SUPER_ADMIN` no MVP / `USER`)
- **Request**
  ```json
  {
    "imageUrl": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789"
  }
  ```
- **Response (201)**
  ```json
  {
    "id": 12,
    "companyId": 1,
    "userId": 2,
    "uploadId": null,
    "status": "SUCCESS",
    "resultJson": {
      "predictions": [
        {
          "x": 250.5,
          "y": 140.0,
          "width": 50,
          "height": 80,
          "confidence": 0.925,
          "class": "defect-scratch"
        }
      ]
    },
    "confidence": 0.925,
    "inferenceMs": 145,
    "createdAt": "2026-06-06T18:30:00.000Z"
  }
  ```

#### `GET /inspections`
- **Auth**: JWT (Escopado pela Empresa)
- **Response (200)**
  ```json
  [
    {
      "id": 12,
      "status": "SUCCESS",
      "confidence": 0.925,
      "createdAt": "2026-06-06T18:30:00.000Z"
    }
  ]
  ```

---

## 10. Modelo de Dados (PostgreSQL / Prisma)

### 10.1 Plan
Representa os planos de assinatura disponíveis para venda.

| Campo | Tipo | Obrigatório | Observações |
|---|---|---|---|
| `id` | Int | Sim | PK, autoincremento |
| `name` | String | Sim | Nome comercial (ex: Starter, Enterprise) |
| `price` | Float | Sim | Preço recorrente mensal |
| `description` | String | Não | Detalhes dos recursos inclusos |
| `createdAt` | DateTime | Sim | Data de criação |

### 10.2 Company (Tenant)
Empresa assinante da plataforma.

| Campo | Tipo | Obrigatório | Observações |
|---|---|---|---|
| `id` | Int | Sim | PK, autoincremento |
| `name` | String | Sim | Razão social ou nome fantasia |
| `cnpj` | String | Não | CNPJ da empresa (Unique) |
| `planId` | Int | Não | FK para o plano ativo |
| `createdAt` | DateTime | Sim | Data de criação |

### 10.3 User
Usuários da plataforma pertencentes a uma empresa.

| Campo | Tipo | Obrigatório | Observações |
|---|---|---|---|
| `id` | Int | Sim | PK, autoincremento |
| `name` | String | Sim | Nome completo |
| `email` | String | Sim | Email de acesso (Unique) |
| `password` | String | Sim | Senha criptografada (bcrypt/argon2) |
| `role` | Enum | Sim | Nível de acesso: `USER`, `ADMIN`, `SUPER_ADMIN` |
| `companyId` | Int | Sim | FK para a empresa do usuário |

### 10.4 Upload
Registros de mídias enviadas para o bucket/armazenamento.

| Campo | Tipo | Obrigatório | Observações |
|---|---|---|---|
| `id` | Int | Sim | PK, autoincremento |
| `url` | String | Sim | URL pública/privada de acesso ao arquivo |
| `filename` | String | Sim | Nome original do arquivo |
| `size` | Int | Não | Tamanho em bytes |
| `mimeType` | String | Não | Tipo de mídia (ex: image/jpeg) |
| `companyId` | Int | Sim | FK para a empresa dona do arquivo |
| `userId` | Int | Não | FK para o usuário que fez o upload |

### 10.5 Inspection
Registros de análises de visão computacional.

| Campo | Tipo | Obrigatório | Observações |
|---|---|---|---|
| `id` | Int | Sim | PK, autoincremento |
| `companyId` | Int | Sim | FK para a empresa |
| `userId` | Int | Não | FK para o usuário solicitante |
| `uploadId` | Int | Não | FK para o arquivo de upload associado |
| `status` | Enum | Sim | Status do processamento: `PROCESSING`, `SUCCESS`, `FAILED` |
| `resultJson` | Json | Sim | JSON de retorno bruto do roboflow/modelo local |
| `confidence` | Float | Não | Confiança média estimada da inspeção |
| `inferenceMs` | Int | Não | Tempo gasto para a inferência em ms |
| `createdAt` | DateTime | Sim | Data de criação |

---

## 11. Validações

* **Validação de Payload (class-validator)**: Todo DTO recebido é validado para garantir tipos corretos (ex: URL válida, strings não nulas).
* **Validação de CNPJ**: Bloqueio de cadastros de CNPJs duplicados no domínio de `companies`.
* **Validação de E-mail**: Bloqueio de e-mails duplicados e formato estrutural de email válido no domínio de `users`.

---

## 12. Erros e Mensagens

### 12.1 Formato Padrão (NestJS Default Filter)

```json
{
  "statusCode": 400,
  "message": "Mensagem detalhando o erro encontrado",
  "error": "Bad Request"
}
```

### 12.2 Lista de Erros Comuns

* `401 Unauthorized`: Token JWT expirado, ausente ou inválido.
* `403 Forbidden`: Usuário não possui a role necessária para acessar a rota (ex: `USER` acessando rotas restritas a `SUPER_ADMIN`).
* `404 Not Found`: Recurso (Usuário, Empresa, Plano ou Inspeção) não encontrado.
* `409 Conflict`: E-mail ou CNPJ já cadastrado no sistema.

---

## 13. Tecnologias e Dependências

* **Linguagem**: TypeScript / JavaScript / Python
* **Framework Backend**: NestJS (v10)
* **Framework Frontend**: React (Vite) + Tailwind CSS (Template TailAdmin)
* **Banco de Dados**: PostgreSQL
* **ORM**: Prisma (client gerado sob demanda)
* **Auth**: Passport JWT (`@nestjs/jwt`)
* **ML Service**: Python 3.10, FastAPI, YOLOv8
* **Provedor de Visão Computacional**: Roboflow API

---

## 14. Observabilidade

* **Logs**: Integração de Logger padrão do NestJS nos interceptors globais.
* **Monitoramento**: Configuração de segurança preventiva baseada em Logs detalhados para auditoria de segurança (Helmet, CORS e Rate Limiting registrados).

---

## 15. Estrutura do Projeto

O repositório está organizado de forma modular para suportar o monólito modular:

```
vision-track/
├── client/                 # Frontend React (Vite)
│   ├── src/
│   │   ├── components/     # Componentes visuais reutilizáveis
│   │   ├── pages/          # Páginas (Dashboard, Auth, etc)
│   │   └── App.tsx         # Configuração de rotas react-router
├── server/                 # Backend principal NestJS
│   ├── src/
│   │   ├── database/       # Schema do Prisma e configurações de banco
│   │   ├── modules/        # Monólito Modular (DDD / Bounded Contexts)
│   │   │   ├── core/       # auth, companies, plans, users
│   │   │   ├── ai/         # inspections (integrado com Roboflow)
│   │   │   └── platform/   # uploads
│   │   └── main.ts         # Arquivo de bootstrap e segurança do NestJS
├── ml/                     # Módulo opcional de Machine Learning em Python
│   ├── src/
│   │   └── visiontrack_ml/ # Pipelines de inferência/treinamento locais (FastAPI)
├── docs/                   # Documentação técnica e de negócio (specs, ADRs)
└── dev.bat                 # Script utilitário interativo para setup local no Windows
```

---

## 16. Casos de Teste (Mínimo)

### 16.1 Testes Unitários (Backend)
* `inspections.service.spec.ts`: Garantir que a chamada externa para o Roboflow funciona de forma mockada e persiste no Prisma.
* `users.service.spec.ts`: Garantir que o hash de senhas funciona no cadastro de usuários.

### 16.2 Testes de Integração
* Validar que chamadas autenticadas com JWT do tenant X não retornam registros do tenant Y.

---

## 17. Critérios de Aceitação

* [x] Autenticação via JWT implementada no backend.
* [x] Rotas principais protegidas por Roles Guard (`SUPER_ADMIN`, `ADMIN`).
* [x] Endpoint de inferência integrado com sucesso ao Roboflow retornando previsões.
* [x] Todas as migrações criadas no banco refletindo o schema Prisma.
* [x] Script `dev.bat` configurado e funcional para subir o ambiente no Windows.

---

## 18. Roadmap / Próximos Passos

* **Substituição dos IDs fixados (MVP)**: Migrar a lógica provisória de `companyId = 1` nos controllers e services para usar dinamicamente o `companyId` proveniente do payload do Token JWT decodificado.
* **Integração Real de Modelos Locais**: Ligar o módulo NestJS `inspections` à API FastAPI do diretório `/ml` para processamento 100% offline via YOLOv8.
* **Dashboard Customizado**: Adaptar as telas mockadas do TailAdmin no frontend para exibir os dados reais retornados pelo endpoint `/inspections` da respectiva empresa.
* **Upload Integrado no S3/MinIO**: Conectar o módulo `uploads` a um provedor S3 para armazenar imagens de inspeção de forma persistente na nuvem, em vez de enviar apenas links de URLs públicas.
