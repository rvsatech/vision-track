import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/database/generated/prisma/enums';

export class UserEntity {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ enum: Role })
  role!: Role;

  @ApiProperty()
  companyId!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
