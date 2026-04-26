import { Role } from '../../../../database/generated/prisma/client';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
  companyId: number;
}
