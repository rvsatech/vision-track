# Tech Stack: Docker, Prisma, NestJS e TypeScript

## Context
A plataforma Vision Track precisa de um backend robusto, escalável, fácil de manter e que garanta alta produtividade para a equipe de desenvolvimento. Era necessário escolher uma base tecnológica que suportasse a evolução de um SaaS multitenant com integrações complexas de inteligência artificial, processamento de imagens e faturamento. Além disso, o ambiente de desenvolvimento precisava ser consistente e seguro em qualquer máquina, minimizando problemas de configuração local e dependências do sistema operacional.

## Decision
Foi escolhido o conjunto de tecnologias composto por:
- **NestJS**: Framework Node.js opinativo que fornece uma arquitetura nativa focada em modularidade, decorators e injeção de dependências.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática, reduzindo bugs em tempo de compilação e melhorando a segurança das integrações (intellisense).
- **Prisma ORM**: Uma ferramenta moderna para acesso ao banco de dados com tipagem estrita gerada automaticamente a partir de um schema de dados centralizado.
- **Docker**: Plataforma de containers para isolar e padronizar os serviços de infraestrutura (como o banco de dados PostgreSQL e, no futuro, mensageria ou caches) localmente e em produção.

## Consequences

**Impactos Positivos:**
- **Ecossistema Coeso**: NestJS e TypeScript combinam perfeitamente. A tipagem fim-a-fim, estendida pelo Prisma, garante uma experiência de desenvolvimento ágil onde erros de dados ou campos inexistentes são pegos instantaneamente.
- **Produtividade e Padronização**: A arquitetura do NestJS padroniza a criação de módulos e impede que o projeto vire um "código espaguete". O Prisma simplifica drasticamente a execução de migrations e queries relacionais complexas.
- **Ambiente Previsível (Dev Parity)**: Com o Docker, evitamos o famoso "na minha máquina funciona". O banco de dados levanta com apenas um comando (`docker compose up`), sem precisar de instalações confusas e dependências conflitantes na máquina do dev.

**Impactos Negativos:**
- **Curva de Aprendizado Inicial**: Desenvolvedores sem experiência forte em orientação a objetos, injeção de dependências e design patterns (como Singleton e Factory) levam um tempo a mais para dominar o ecossistema do NestJS.
- **Consumo de Memória Local**: Executar o ambiente completo através do Docker e com compilação pesada do TypeScript pode ser custoso em consumo de RAM durante o desenvolvimento em máquinas modestas.
