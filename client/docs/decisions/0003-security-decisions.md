# Decisões de Segurança (Main.ts)

Este documento descreve as medidas de segurança implementadas no arquivo `server/src/main.ts` e as justificativas para cada uma delas.

## 1. Helmet
**Código:**
```typescript
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
```
**Por que?**
O Helmet ajuda a proteger a aplicação de algumas vulnerabilidades web bem conhecidas, configurando os cabeçalhos (headers) HTTP adequadamente. Ele mitiga ataques como Clickjacking, Sniffing de MIME-type, e Cross-Site Scripting (XSS). No nosso caso, configuramos a política de recursos de origem cruzada para permitir o uso de recursos entre diferentes origens se necessário.

## 2. Limite de Payload (Body Limit)
**Código:**
```typescript
app.use(json({ limit: '1mb' }));
app.use(urlencoded({ extended: true, limit: '1mb' }));
```
**Por que?**
Evita ataques de negação de serviço (DoS) por meio de "Payload Attacks". Sem um limite, um atacante poderia enviar um corpo de requisição gigantesco, consumindo toda a memória do servidor e travando a aplicação.

## 3. Rate Limiting
**Código:**
```typescript
rateLimit({ windowMs: 60 * 1000, max: 120, ... })
```
**Por que?**
Limita o número de requisições que um único IP pode fazer em um determinado intervalo de tempo (120 requisições por minuto). Isso é crucial para prevenir ataques de força bruta (tentativas repetidas de login), spam de formulários e ataques de inundação (flood) em nível de aplicação (HTTP Layer 7).

## 4. CORS (Cross-Origin Resource Sharing)
**Código:**
```typescript
app.enableCors({ origin: (origin, callback) => { ... }, credentials: true, ... });
```
**Por que?**
O CORS define quais domínios (além do próprio servidor) têm permissão para acessar a API através do navegador. Isso impede que sites maliciosos façam requisições em nome do usuário para nossa API. Usamos uma lista de origens permitidas (whitelist) em vez de um curinga (`*`) para manter a segurança, especialmente ao permitir credenciais (cookies/headers de autenticação).

## 5. Validation Pipe Global (Anti-Mass Assignment)
**Código:**
```typescript
new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, ... })
```
**Por que?**
A configuração `whitelist: true` remove automaticamente qualquer propriedade enviada no corpo da requisição que não esteja explicitamente definida no DTO (Data Transfer Object). O `forbidNonWhitelisted: true` rejeita a requisição se houver campos extras. Isso evita o ataque de "Mass Assignment", onde um atacante tenta injetar campos privilegiados (como `isAdmin: true`) em objetos do sistema.

## 6. Desabilitar "X-Powered-By"
**Código:**
```typescript
app.getHttpAdapter().getInstance().disable('x-powered-by');
```
**Por que?**
Aplica o princípio de "Security by Obscurity". Ao remover este cabeçalho, evitamos expor que estamos usando o framework Express, dificultando que atacantes usem ferramentas automatizadas que buscam vulnerabilidades específicas de versões conhecidas do framework.

## 7. Restrição do Swagger
**Código:**
```typescript
if (process.env.NODE_ENV !== 'production') { ... SwaggerModule.setup('docs', app, document); }
```
**Por que?**
A documentação do Swagger expõe todos os endpoints, modelos de dados e a estrutura interna da API. Embora seja vital para o desenvolvimento, deixá-la exposta em produção fornece um "mapa" valioso para possíveis atacantes.

## 8. Trust Proxy (Configuração Pendente)
**Código:**
```typescript
// app.getHttpAdapter().getInstance().set('trust proxy', 1);
```
**Por que?**
Quando a aplicação está atrás de um proxy (como Nginx ou Cloudflare), o endereço IP do cliente real é passado no cabeçalho `X-Forwarded-For`. Sem essa configuração, o servidor veria apenas o IP do proxy, o que invalidaria o Rate Limiting e os logs de auditoria. No entanto, deve ser ativado apenas se houver um proxy confiável à frente para evitar IP spoofing.
