import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInspectionDto {
  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789',
  })
  @IsString()
  imageUrl!: string;
}