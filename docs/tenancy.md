# Multi-Tenancy Strategy

## Approach

Shared Database + Tenant Isolation.

Todas as tabelas possuem `companyId`.

---

## Security Rules

- Usuários só acessam dados da própria empresa
- Models são isolados por empresa
- Uploads são isolados por empresa
- Inspections são isoladas por empresa

---

## Backend Enforcement

Toda query deve obrigatoriamente filtrar:

```ts
where: {
   companyId: user.companyId
}
