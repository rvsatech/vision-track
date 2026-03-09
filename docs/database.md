# Database Design

## Provider

PostgreSQL

---

## ORM

Prisma

Motivos:

- tipagem forte
- migrations seguras
- excelente integração com NestJS

---

## Design Strategy

Banco relacional com isolamento por tenant.

Principais pilares:

- Companies são o topo da hierarquia
- Users pertencem a companies
- AI Models pertencem a companies
- Inspections pertencem a companies

---

## Naming Conventions

- tabelas no singular (Company, User)
- camelCase nos campos
- ids auto incrementais

---

## Future Improvements

- índices avançados
- read replicas
- particionamento de tabelas grandes (inspections)
