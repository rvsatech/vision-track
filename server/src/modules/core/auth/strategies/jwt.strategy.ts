import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { TEST_JWT_SECRET } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret || TEST_JWT_SECRET,
    });

    if (!secret) {
      this.logger.warn(
        'JWT_SECRET não encontrado no .env. Utilizando chave de teste (INSEGURO PARA PROD).',
      );
    }
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado ou inativo.');
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      companyId: payload.companyId,
    };
  }
}
