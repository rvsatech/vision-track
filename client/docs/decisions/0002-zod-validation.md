# ADR 0002: Zod para Validação de Esquemas

## Context
Garantir que os dados manipulados no frontend (formulários e respostas de API) estejam no formato correto é crítico para evitar erros em tempo de execução.

## Decision
Adotamos o **Zod** como biblioteca de schema validation.

## Consequences
- **Positivas**: Tipagem estática garantida (Inferência de tipos do TS), validações complexas e legíveis, integração perfeita com `react-hook-form`.
- **Negativas**: Nenhuma significativa.
