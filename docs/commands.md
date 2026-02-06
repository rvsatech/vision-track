# 🚀 Docker, PostgreSQL e Prisma - Cheat Sheet (Dev Local + Docker)

## 🐳 DOCKER
- `docker compose ps`: Lista todos os containers ativos e suas portas. **Usado para verificar se containers estão rodando e se as portas estão corretas.**
- `docker compose up -d`: Sobe os containers em background. **Usado para iniciar o projeto com todos os serviços (API + banco) em execução.**
- `docker compose down`: Derruba os containers. **Usado para parar o projeto quando não estiver em uso.**
- `docker compose down -v`: Derruba containers e apaga volumes (reseta banco). **Usado quando quer reiniciar o banco do zero em desenvolvimento.**
- `docker compose logs -f <service>`: Mostra logs de um serviço em tempo real. **Usado para debugar problemas na API ou banco.**
- `docker logs -f <container>`: Mostra logs de um container específico. **Usado quando quer focar apenas em um container.**
- `docker exec -it <container> sh`: Entra no shell de um container (API). **Usado para rodar comandos dentro do container da API, como Prisma ou testes.**
- `docker exec -it <container> bash`: Entra no shell de um container (Postgres). **Usado para acessar o banco diretamente no container.**
- `docker exec -it <container> <comando>`: Roda um comando direto no container, ex.: `docker exec -it visiontrack-postgres psql -U visiontrack -d visiontrack -c "\dt"`. **Usado para executar comandos rápidos sem entrar no container.**

## 🐘 POSTGRES (psql)
- `psql -U <user> -d <database>`: Conecta ao banco. **Usado para abrir o console interativo do Postgres.**
- `\dt`: Lista tabelas do banco conectado. **Usado para checar quais tabelas existem após migrations ou db push.**
- `\d "TableName"`: Mostra estrutura de uma tabela (case-sensitive para nomes com maiúsculas). **Usado depois de criar ou alterar tabelas para ver colunas e tipos.**
- `\d+ "TableName"`: Mostra estrutura detalhada da tabela. **Usado para ver detalhes como índices e constraints.**
- `\l`: Lista todos os bancos. **Usado para verificar se o banco correto existe.**
- `\c <database>`: Conecta em outro banco. **Usado quando precisa trocar de banco dentro do mesmo servidor.**
- `\q`: Sai do psql. **Usado para fechar o console.**
- `SELECT * FROM "TableName";`: Lista dados da tabela. **Usado para inspecionar registros inseridos ou testar queries.**
- `TRUNCATE TABLE "TableName" CASCADE;`: Apaga todos os dados de uma tabela e suas dependências. **Usado em dev para limpar dados sem derrubar o schema.**

## 🔺 PRISMA
- `pnpm prisma migrate dev --name <migration>`: Cria e aplica migrations no desenvolvimento. **Usado depois de alterar o schema do Prisma para manter histórico de alterações.**
- `pnpm prisma migrate deploy`: Aplica migrations existentes (produção / docker). **Usado em produção ou containers Docker para sincronizar banco com migrations sem criar novas.**
- `pnpm prisma db push`: Sincroniza schema sem criar migrations (prototipagem). **Usado para testes rápidos em dev quando não precisa de histórico.**
- `pnpm prisma migrate reset`: Reseta o banco e aplica migrations (DEV apenas). **Usado em desenvolvimento para começar o banco do zero.**
- `pnpm prisma generate`: Gera o Prisma Client. **Usado depois de alterar o schema para atualizar o client.**
- `pnpm prisma studio`: Abre Prisma Studio (interface visual do banco). **Usado para inspecionar e editar dados visualmente durante desenvolvimento.**
- `pnpm prisma studio --hostname 0.0.0.0`: Abre Prisma Studio acessível fora do container. **Usado quando Prisma Studio está rodando dentro do Docker e você quer acessar pelo navegador do host.**

## 🧠 DICAS PROFISSIONAIS
- Sempre rode comandos Prisma no ambiente que sua API usa (local ou Docker).
- Evite `db push` em projetos sérios, use migrations.
- Para tabelas criadas com maiúsculas (ex: `User`), use aspas no SQL: `SELECT * FROM "User";`.
- Top comandos para debug rápido:
  - `docker compose ps`
  - `docker compose logs -f api`
  - `docker exec -it <container> sh`
  - `pnpm prisma migrate dev`
  - `\dt`

---
*Este arquivo serve como guia rápido para desenvolvimento com Docker, PostgreSQL e Prisma, incluindo contexto de uso para cada comando.*
