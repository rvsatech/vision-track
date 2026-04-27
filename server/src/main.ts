import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  VersioningType,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // evita perder logs durante o startup (quando a app ainda está inicializando)
  });

  const logger = new Logger('Bootstrap');

  /**
   * TRUST PROXY
   * Quando você roda atrás de proxy/load balancer (Cloudflare, Nginx, AWS ALB),
   * o IP real do cliente vem no header "X-Forwarded-For".
   *
   * Se você não ativar isso, o Nest/Express pode enxergar o IP do proxy ao invés do IP real.
   *
   * IMPORTANTE:
   * Só use isso se realmente existir proxy na frente. Caso contrário, alguém pode "falsificar" IP.
   */
  // app.getHttpAdapter().getInstance().set('trust proxy', 1);

  /**
   * PREFIXO GLOBAL
   * Padroniza as rotas para sempre começarem com /api
   * Ex: /api/v1/users
   */
  app.setGlobalPrefix('api');

  /**
   * VERSIONAMENTO
   * Ajuda a manter versões da API (v1, v2...) sem quebrar clientes antigos.
   */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  /**
   * HELMET
   * Middleware que adiciona headers de segurança HTTP.
   * Isso ajuda a mitigar ataques comuns no browser (ex: clickjacking).
   *
   * Clickjacking = quando alguém tenta "enganar" o usuário a clicar em algo invisível.
   */
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  /**
   * COMPRESSION
   * Compacta as respostas (gzip/brotli dependendo do client).
   * Ajuda performance e reduz tráfego.
   */
  app.use(compression());

  /**
   * BODY LIMIT
   * Limita tamanho do payload (JSON/form).
   *
   * Isso reduz risco de "Payload Attack"
   * (ataque enviando corpo gigantesco pra consumir memória e travar o servidor).
   */
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  /**
   * RATE LIMIT (ANTI BRUTE FORCE / ANTI SPAM)
   *
   * Rate limit = limitar quantas requisições um IP pode fazer por período.
   *
   * Isso ajuda contra:
   * - brute force (tentativa repetida de senha)
   * - flood (spam massivo de requests)
   * - DDoS simples de camada HTTP (Layer 7)
   *
   * Obs: DDoS grande de verdade precisa de WAF/CDN (Cloudflare/AWS Shield),
   * mas isso já ajuda muito em ataques pequenos.
   */
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minuto
      max: 120, // máximo de 120 requests por minuto por IP
      standardHeaders: true, // adiciona headers de rate limit na resposta
      legacyHeaders: false, // remove headers antigos (deprecated)
      message: {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Too many requests, please try again later.',
      },
    }),
  );

  /**
   * CORS
   *
   * CORS = política do navegador que controla quais sites podem acessar sua API.
   *
   * Isso evita que qualquer site na internet consiga chamar sua API diretamente do browser.
   *
   * IMPORTANTE:
   * Nunca use origin "*" junto com credentials=true,
   * porque isso pode abrir brecha para sites maliciosos enviarem requests autenticados.
   */
  const allowedOrigins =
    process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) ?? [
      'http://localhost:3000',
    ];

  app.enableCors({
    origin: (origin: string, callback: (arg0: Error | null, arg1: boolean) => any) => {
      // permite chamadas server-to-server (sem origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /**
   * VALIDATION PIPE GLOBAL
   *
   * whitelist = remove campos extras que não existem no DTO
   * forbidNonWhitelisted = rejeita request se vier campo inesperado
   *
   * Isso protege contra "Mass Assignment"
   * Mass Assignment = quando o atacante tenta enviar campos extras
   * para alterar coisas que ele não deveria (ex: isAdmin=true).
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * DESABILITAR "X-Powered-By"
   *
   * Isso remove o header que revela que você usa Express.
   * Não é uma proteção forte, mas reduz exposição de informações.
   *
   * Isso é chamado de "Security by Obscurity":
   * significa esconder detalhes do sistema para dificultar ataques automáticos.
   * Não resolve tudo, mas ajuda como camada extra.
   */
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  /**
   * SWAGGER
   *
   * Swagger expõe documentação interativa da API.
   * Isso é ótimo em dev, mas perigoso em produção,
   * porque mostra endpoints, DTOs e estrutura do sistema.
   *
   * Então só habilitamos em ambiente não-produção.
   */
  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);

    logger.log('Swagger enabled at /docs (DEV only)');
  }

  /**
   * SHUTDOWN HOOKS
   * Garante desligamento gracioso (ex: fechar conexões do Prisma corretamente).
   */
  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 3003);

  await app.listen(port);

  logger.log(`SERVER: http://localhost:${port}`);
  if (process.env.NODE_ENV !== 'production') {
    logger.log(`API DOCS: http://localhost:${port}/docs`);
  }
}

bootstrap();