import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from '../entities/company.entity';

export class CompanyResponseMetaDto {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalPages!: number;
}

export class PaginatedCompanyResponseDto {
  @ApiProperty({ type: [CompanyEntity] })
  data!: CompanyEntity[];

  @ApiProperty({ type: CompanyResponseMetaDto })
  meta!: CompanyResponseMetaDto;
}
