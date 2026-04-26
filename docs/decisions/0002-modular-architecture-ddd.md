# Modular Architecture and Bounded Contexts (DDD)

## Context
O Vision Track é um sistema SaaS complexo e de rápido crescimento com múltiplas frentes de domínio: a gestão administrativa/SaaS (empresas, usuários, assinaturas), as funcionalidades especializadas de inteligência artificial (inspeções, análises de imagens, modelos customizados) e a infraestrutura de apoio (uploads de mídia, faturamento). Se construíssemos tudo de forma altamente acoplada (numa única pasta de rotas e services, como num projeto Express padrão), trocar um serviço externo de visão computacional (ex: Roboflow ou OpenCV local) ou alterar a forma de lidar com bucket de imagens impactaria o núcleo do sistema inteiro, dificultando manutenções simples e elevando a dívida técnica com o tempo.

## Decision
Adotamos uma arquitetura modular inspirada em conceitos do **Domain-Driven Design (DDD)** e **Clean Architecture**, dividindo o código do projeto na pasta estrutural `server/src/modules/` em domínios específicos:
- **Core**: O coração do negócio SaaS (Usuários, Empresas, Autenticação, Planos).
- **AI**: Domínio de negócio de Inteligência Artificial (Inspeções, Treinamento de Modelos, Processamento de Imagens).
- **Platform**: Infraestrutura abstraída, integrações e utilitários da plataforma de serviço (Uploads de S3, Billing/Stripe).

O princípio básico implementado é **inversão de dependência** e **isolamento**: integrações externas (como a API do Roboflow) devem residir dentro de `Services` isolados dentro de seus respectivos módulos. Outros domínios não chamam bibliotecas HTTP ou SDKs diretamente, chamam o `Service` do outro módulo.

## Consequences

**Impactos Positivos:**
- **Isolamento de Tecnologias (Plug & Play)**: O código central não fica "preso" aos fornecedores. Se futuramente mudarmos do *Roboflow* para uma API construída no *GCP Vertex AI*, bastará plugar essa nova API nos serviços de `inspections` ou `ai-models`. O `auth` e o `companies` (Core) sequer saberão dessa mudança estrutural, não havendo chance de efeitos colaterais (bugs cruzados).
- **Agnosticismo de Domínios (Bounded Contexts)**: Cada módulo cuida apenas de sua própria responsabilidade de negócios.
- **Escalabilidade de Equipes e Microserviços**: Diferentes desenvolvedores podem construir as APIs em `core`, `ai` e `platform` isoladamente. Além disso, a arquitetura de *Monólito Modular* facilita drasticamente caso um dia o tráfego obrigue o processamento de Imagens (`AI`) a se tornar um microserviço 100% isolado rodando em instâncias de CPU focadas.

**Impactos Negativos:**
- **Complexidade de Arquivos e Navegação**: O código fica fracionado em muitos diretórios, exigindo que o time tenha disciplina com a documentação para saber onde cada domínio reside.
- **Comunicação Cross-Module**: Módulos precisam exportar explicitly seus `Services` na definição do `Module` no NestJS. Desatenção pode resultar em erros de Dependências Circulares ("Circular dependency detected").
