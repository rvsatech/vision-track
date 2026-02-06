import { PartialType } from '@nestjs/mapped-types';
import { CreateBobinaDto } from './create-bobina.dto';

export class UpdateBobinaDto extends PartialType(CreateBobinaDto) {}
