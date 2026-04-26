import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserResponseMetaDto {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalPages!: number;
}

export class PaginatedUserResponseDto {
  @ApiProperty({ type: [UserEntity] })
  data!: UserEntity[];

  @ApiProperty({ type: UserResponseMetaDto })
  meta!: UserResponseMetaDto;
}
