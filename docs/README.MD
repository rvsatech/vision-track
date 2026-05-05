# Documentação do Projeto

Este diretório contém toda a documentação principal do projeto, incluindo especificações, arquitetura, decisões técnicas e guias de setup.

---

## 📌 Leitura recomendada (ordem)

1. [`spec.md`](./spec.md) — requisitos, escopo e regras do sistema
2. [`architecture.md`](./architecture.md) — visão geral da arquitetura e componentes
3. [`setup.md`](./setup.md) — como rodar o projeto localmente
4. [`decisions/`](./decisions) — decisões técnicas (ADRs)

---

## 📄 Arquivos principais

### `spec.md`
Documento principal de requisitos do projeto.

Contém:
- objetivo
- escopo (in/out)
- requisitos funcionais (RF)
- requisitos não funcionais (RNF)
- regras de negócio
- fluxos principais
- critérios de aceitação
- roadmap

---

### `architecture.md`
Documento de arquitetura e design técnico.

Contém:
- visão geral do sistema
- componentes (server/client/ml)
- integração entre serviços
- modelo de dados geral
- comunicação e protocolos
- observabilidade

---

### `setup.md`
Guia de instalação e execução local.

Contém:
- dependências necessárias
- variáveis de ambiente
- comandos de execução (dev/test/prod)
- docker / docker-compose
- troubleshooting básico

---

## 🧠 Decisions (ADRs)

Diretório: [`decisions/`](./decisions)

Cada arquivo representa uma decisão técnica importante tomada durante o desenvolvimento.

Formato sugerido:
- Contexto
- Decisão
- Alternativas consideradas
- Consequências

Exemplo:
- `0001-use-postgresql.md`
- `0002-use-kafka.md`

---

## 📌 Observação importante

- A `spec.md` define **o que** o sistema deve fazer.
- A `architecture.md` define **como** o sistema será construído.
- A pasta `decisions/` registra **por que** certas escolhas foram feitas.

---

## 📎 Documentação específica por módulo

Documentação detalhada de cada módulo deve ficar dentro do próprio módulo:

- `/server/README.md`
- `/client/README.md`
- `/ml/README.md`