# Frontend Architecture — Vision Track

## 1. Overview
O frontend do Vision Track é construído com **Next.js 16+** utilizando a **App Router architecture**. O foco é manter um código modular, tipado e fácil de testar, separando claramente as preocupações de UI e Lógica de Negócio.

## 2. Folder Structure (src/ pattern)
Adotamos o padrão de pasta `src/` para centralizar o código da aplicação:

- **`app/`**: Roteamento baseado em arquivos (File-system routing). Contém as páginas e layouts.
- **`components/`**: 
    - `ui/`: Componentes base reutilizáveis (Botões, Inputs).
    - `layout/`: Componentes estruturais (Sidebar, Navbar).
- **`services/`**: Camada de comunicação com a API (Axios). Não contém lógica de UI.
- **`hooks/`**: Gerenciamento de estado assíncrono e cache usando **Tanstack Query**.
- **`schemas/`**: Definições de validação de dados com **Zod**.
- **`lib/`**: Configurações de bibliotecas externas (Axios, Utils).
- **`providers/`**: Contextos globais (QueryClient, AuthContext).

## 3. Data Flow
O fluxo de dados segue o padrão:
`Componente (UI)` -> `Hook (Tanstack Query)` -> `Service (Axios)` -> `Backend API`

Isso garante que a UI não precise saber como os dados são buscados ou cacheados.

## 4. Design System
- **Tailwind CSS v4**: Utilizado para estilização baseada em utilitários.
- **Lucide React**: Biblioteca de ícones padrão.
- **Responsividade**: Mobile-first utilizando os breakpoints do Tailwind.
