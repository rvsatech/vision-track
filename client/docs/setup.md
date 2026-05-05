# Frontend Setup & Commands

## 🚀 Como rodar
1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
3. Acesse `http://localhost:3001` (A porta pode variar).

## 🛠️ Comandos Úteis
- `pnpm build`: Gera a versão de produção.
- `pnpm start`: Inicia o servidor com o build de produção.
- `pnpm lint`: Roda o linter para verificar erros de padrão de código.

## 🔑 Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz da pasta `client/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
