````md
# SPEC — <NOME_DO_PROJETO>

## 1. Objetivo

<DESCREVA_EM_POUCAS_LINHAS_O_QUE_O_SISTEMA_FAZ_E_QUAL_PROBLEMA_RESOLVE>

---

## 2. Contexto (Opcional)

<EXPLIQUE_O_CENÁRIO_ATUAL_E_POR_QUE_ESSE_PROJETO_EXISTE>

---

## 3. Escopo

### 3.1 Dentro do escopo (IN)

- <FEATURE_1>
- <FEATURE_2>
- <FEATURE_3>

### 3.2 Fora do escopo (OUT)

- <FORA_DO_ESCOPO_1>
- <FORA_DO_ESCOPO_2>
- <FORA_DO_ESCOPO_3>

---

## 4. Requisitos Funcionais (RF)

- **RF01:** <DESCRIÇÃO_DO_REQUISITO>
- **RF02:** <DESCRIÇÃO_DO_REQUISITO>
- **RF03:** <DESCRIÇÃO_DO_REQUISITO>
- **RF04:** <DESCRIÇÃO_DO_REQUISITO>

---

## 5. Requisitos Não Funcionais (RNF)

- **RNF01:** <DESCRIÇÃO_DO_REQUISITO>
- **RNF02:** <DESCRIÇÃO_DO_REQUISITO>
- **RNF03:** <DESCRIÇÃO_DO_REQUISITO>
- **RNF04:** <DESCRIÇÃO_DO_REQUISITO>

---

## 6. Regras de Negócio (RN)

- **RN01:** <REGRA_DE_NEGÓCIO>
- **RN02:** <REGRA_DE_NEGÓCIO>
- **RN03:** <REGRA_DE_NEGÓCIO>

---

## 7. Usuários / Roles / Permissões

| Role/Perfil | Descrição | Permissões |
|------------|-----------|------------|
| <ROLE_1>   | <DESC>    | <PERMISSOES> |
| <ROLE_2>   | <DESC>    | <PERMISSOES> |

---

## 8. Fluxos Principais

### 8.1 <NOME_DO_FLUXO_1>

1. <PASSO_1>
2. <PASSO_2>
3. <PASSO_3>

### 8.2 <NOME_DO_FLUXO_2>

1. <PASSO_1>
2. <PASSO_2>
3. <PASSO_3>

---

## 9. API / Contratos (se aplicável)

### 9.1 Padrões Gerais

- Formato de request/response: <JSON | XML | etc>
- Autenticação: <JWT | Session | OAuth2 | etc>
- Versionamento: <v1 | /api/v1 | header | etc>
- Padrão de status code: <REST padrão / custom>

---

### 9.2 Endpoints

#### <METHOD> <PATH>

**Auth:** <NENHUM | USER | ADMIN | etc>

**Request**
```json
{
  "<campo>": "<tipo/descrição>"
}
````

**Response**

```json
{
  "<campo>": "<tipo/descrição>"
}
```

**Erros possíveis**

* <ERRO_1>
* <ERRO_2>

---

#### <METHOD> <PATH>

**Auth:** <NENHUM | USER | ADMIN | etc>

**Request**

```json
{
  "<campo>": "<tipo/descrição>"
}
```

**Response**

```json
{
  "<campo>": "<tipo/descrição>"
}
```

**Erros possíveis**

* <ERRO_1>
* <ERRO_2>

---

## 10. Modelo de Dados (Banco)

### 10.1 <NOME_DA_ENTIDADE_1>

| Campo   | Tipo   | Obrigatório | Observações |
| ------- | ------ | ----------- | ----------- |
| <campo> | <tipo> | <sim/não>   | <obs>       |
| <campo> | <tipo> | <sim/não>   | <obs>       |

---

### 10.2 <NOME_DA_ENTIDADE_2>

| Campo   | Tipo   | Obrigatório | Observações |
| ------- | ------ | ----------- | ----------- |
| <campo> | <tipo> | <sim/não>   | <obs>       |
| <campo> | <tipo> | <sim/não>   | <obs>       |

---

## 11. Validações

* <VALIDAÇÃO_1>
* <VALIDAÇÃO_2>
* <VALIDAÇÃO_3>

---

## 12. Erros e Mensagens

### 12.1 Formato padrão

```json
{
  "error": "<CODIGO_DO_ERRO>",
  "message": "<MENSAGEM_HUMANA>",
  "details": "<OPCIONAL>"
}
```

### 12.2 Lista de erros possíveis

* <ERRO_1>
* <ERRO_2>
* <ERRO_3>

---

## 13. Tecnologias e Dependências

* Linguagem: <...>
* Framework: <...>
* Banco: <...>
* ORM/ODM: <...>
* Auth: <...>
* Infra: <...>
* Testes: <...>
* Mensageria: <...>
* Storage: <...>

---

## 14. Observabilidade (Logs / Metrics / Tracing)

* Logs: <formato/padrão>
* Metrics: <sim/não + ferramenta>
* Tracing: <sim/não + ferramenta>
* Monitoramento: <sim/não + ferramenta>

---

## 15. Estrutura do Projeto (Sugestão)

```
<estrutura_de_pastas>
```

---

## 16. Casos de Teste (mínimo)

### 16.1 Testes Unitários

* <TESTE_1>
* <TESTE_2>
* <TESTE_3>

### 16.2 Testes de Integração

* <TESTE_1>
* <TESTE_2>

### 16.3 Testes E2E (se aplicável)

* <TESTE_1>
* <TESTE_2>

---

## 17. Critérios de Aceitação

* [ ] <CRITÉRIO_1>
* [ ] <CRITÉRIO_2>
* [ ] <CRITÉRIO_3>

---

## 18. Checklist de Entrega

* [ ] Código implementado
* [ ] Testes passando
* [ ] Lint/format ok
* [ ] Documentação atualizada
* [ ] Docker/infra funcionando
* [ ] Deploy/teste validado

---

## 19. Decisões Técnicas (ADR resumido)

* <DECISÃO_1> — <JUSTIFICATIVA>
* <DECISÃO_2> — <JUSTIFICATIVA>

---

## 20. Roadmap / Próximos Passos

* <MELHORIA_1>
* <MELHORIA_2>
* <MELHORIA_3>

```
```
