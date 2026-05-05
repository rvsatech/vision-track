```md
# Commit & PR Conventions

Este documento define o padrão oficial para **commits**, **branches** e **pull requests** do projeto.

Objetivos:
- manter histórico limpo e rastreável
- facilitar code review
- permitir automações (CI/CD, changelog, versionamento)
- padronizar colaboração

---

# 1. Commit Convention (Conventional Commits)

Formato padrão:

```

<type>(<scope>): <descrição curta>

```

Exemplo:

```

feat(auth): add login endpoint
fix(server): handle invalid token
docs: update setup instructions

```

---

# 2. Types (`type`)

Tipos permitidos:

- **feat**: nova funcionalidade
- **fix**: correção de bug
- **docs**: documentação
- **style**: formatação (não muda lógica)  
  *(ex: prettier, lint, espaçamento, etc)*
- **refactor**: refatoração sem mudar comportamento externo
- **perf**: melhoria de performance
- **test**: criação/alteração de testes
- **build**: mudanças em build/config (docker, bundlers, tsconfig)
- **ci**: mudanças em pipelines/CI/CD
- **chore**: tarefas gerais (deps, scripts, housekeeping)
- **revert**: reverter commit anterior

---

# 3. Scope (`scope`)

O `scope` é opcional, mas recomendado.

Use o nome do módulo ou área impactada.

Scopes recomendados:

- `server`
- `client`
- `ml`
- `api`
- `auth`
- `db`
- `infra`
- `docs`
- `core`

Exemplos:

```

feat(server): add healthcheck endpoint
fix(db): correct migration rollback
docs(client): document build steps

```

---

# 4. Commit Message Rules

A descrição curta deve:

- ser clara e objetiva
- usar verbo no presente (imperativo)
- preferencialmente em inglês
- não terminar com ponto final

✅ Bom:
- `add user profile endpoint`
- `fix password validation`
- `remove unused dependency`

❌ Ruim:
- `added new feature`
- `fixing things`
- `update`
- `final version`

---

# 5. Breaking Changes

Se uma mudança quebra compatibilidade, use `!`:

```

feat!: change auth token format

```

Ou adicione no corpo do commit:

```

BREAKING CHANGE: token format changed and old clients will fail

```

---

# 6. Commit Body (Opcional)

Use o corpo do commit para contexto extra.

Exemplo:

```

feat(auth): add refresh token support

Implemented token rotation and persistence.
This improves session security and reduces re-login frequency.

```

---

# 7. Referência a Issues/Tickets

Quando existir issue relacionada:

```

fix(server): prevent null pointer on auth middleware

Closes #42

```

Outras opções válidas:
- `Refs #42`
- `Related to #42`

---

# 8. Regras gerais para commits

- Commits devem ser pequenos e atômicos
- Um commit deve representar uma mudança lógica completa
- Evitar misturar refactor grande + feature grande no mesmo commit
- Não commitar código quebrado intencionalmente
- Preferir vários commits bem descritos do que 1 commit gigante

---

# 9. Branch Naming Convention

Formato recomendado:

```

<type>/<descrição-curta>

```

Exemplos:

- `feat/user-auth`
- `feat/client-dashboard`
- `fix/login-expiration`
- `docs/update-setup`
- `refactor/server-cleanup`
- `chore/deps-update`
- `ci/add-workflow-tests`

---

# 10. Pull Request Convention

## 10.1 Nome do PR

Formato recomendado:

```

[type] descrição curta

````

Exemplos:

- `[feat] Add authentication module`
- `[fix] Fix invalid token expiration`
- `[docs] Improve setup instructions`
- `[refactor] Simplify API service layer`

---

## 10.2 Conteúdo obrigatório do PR

Todo PR deve conter:

- resumo do que foi feito
- motivação/contexto
- como testar
- checklist mínimo

---

# 11. PR Template (padrão oficial)

Copie e cole no corpo do PR:

```md
## O que foi feito?

- <mudança 1>
- <mudança 2>

## Por que isso foi feito?

<contexto e motivação>

## Como testar?

1. <passo 1>
2. <passo 2>
3. <passo 3>

## Checklist

- [ ] Código testado localmente
- [ ] Testes automatizados passando
- [ ] Lint/format ok
- [ ] Documentação atualizada (se necessário)
- [ ] Não há mudanças fora do escopo da task/spec

## Issues relacionadas

- Closes #<id>
- Refs #<id>
````

---

# 12. Regras de Pull Request

* PR deve ser pequeno e revisável (evitar PRs gigantes)
* PR deve passar CI antes do merge
* PR deve ter descrição clara
* PR deve incluir instruções de teste
* Evitar misturar várias features diferentes em um PR só

---

# 13. Merge Strategy

Estratégia recomendada:

✅ **Squash and Merge**

Motivos:

* mantém histórico limpo
* reduz commits irrelevantes
* facilita rastrear features e bugs

O commit final do squash deve seguir Conventional Commits:

```
feat(auth): add login and register endpoints
```

---

# 14. Exemplos rápidos

### Nova feature

```
feat(client): add dashboard page
```

### Bugfix

```
fix(server): handle invalid jwt signature
```

### Refatoração

```
refactor(api): simplify error handling
```

### CI/CD

```
ci: add workflow for running tests
```

### Documentação

```
docs: add commit and PR conventions
```

### Dependências

```
chore: update dependencies
```

---

# 15. Recomendações finais

* Prefira consistência ao invés de criatividade
* Commits bons reduzem bugs e aceleram debugging
* PRs bem descritos aceleram review e evitam retrabalho

```
```
