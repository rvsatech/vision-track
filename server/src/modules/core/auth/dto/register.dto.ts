import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'john@visiontrack.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'senhaForte123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  companyId!: number;
}
