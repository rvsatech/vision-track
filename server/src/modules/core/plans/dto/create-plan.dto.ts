import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ example: 'Starter' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 49.9 })
  @IsNumber()
  price!: number;

  @ApiProperty({
    example: 'Plano para detecção de EPIs',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}