# ADR 0001: Uso de Tanstack Query para Gerenciamento de Estado

## Context
Precisávamos de uma forma eficiente de buscar, cachear e sincronizar dados do servidor no React/Next.js, sem a complexidade de gerenciar loadings e erros manualmente em cada componente.

## Decision
Escolhemos o **Tanstack Query (v5)**.

## Consequences
- **Positivas**: Cache automático, invalidação de queries inteligente, gerenciamento nativo de `isLoading` e `isError`, redução drástica de `useEffect` no código.
- **Negativas**: Pequeno aumento no bundle size e curva de aprendizado para entender o ciclo de vida do cache.
