import { ApiProperty } from '@nestjs/swagger';

export class PlanEntity {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty({ required: false, nullable: true })
  description?: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class CompanyEntity {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty({ required: false, nullable: true })
  cnpj!: string | null;

  @ApiProperty({ required: false, nullable: true })
  planId!: number | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: () => PlanEntity, required: false, nullable: true })
  plan?: PlanEntity | null;
}
